import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  Conversa,
  ConversaCanal,
  ConversaStatus,
} from './entities/conversa.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import {
  Mensagem,
  MensagemRemetente,
} from '../mensagem/entities/mensagem.entity';
import { CreateConversaDto } from './dto/create-conversa.dto';
import {
  ConversaResponseDto,
  toConversaResponseDto,
} from './dto/conversa-response.dto';
import { EnviarMensagemDto } from '../mensagem/dto/enviar-mensagem.dto';
import { EnviarMensagemResponseDto } from '../mensagem/dto/enviar-mensagem-response.dto';
import { toMensagemResponseDto } from '../mensagem/dto/mensagem-response.dto';
import { AuthUser } from '../auth/types/auth-user.type';
import { LilaAiService } from './lila-ai.service';

const CONVITE_CADASTRO =
  'Oi! Aqui é a Lila, do LactareConnect 💛 Esse WhatsApp é exclusivo para nutrizes já cadastradas no app. ' +
  'Não encontrei seu número na nossa base — se você tem interesse em doar leite humano, baixe o app LactareConnect ' +
  'nas lojas de aplicativo e faça seu cadastro por lá. Depois disso já consigo te ajudar por aqui também!';

@Injectable()
export class ConversaService {
  constructor(
    @InjectRepository(Conversa)
    private readonly conversaRepository: Repository<Conversa>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly lilaAiService: LilaAiService,
  ) {}

  async create(
    createConversaDto: CreateConversaDto,
    user: AuthUser,
  ): Promise<ConversaResponseDto> {
    const { nutrizId, ...dados } = createConversaDto;

    if (user.tipo === 'nutriz' && user.id !== nutrizId) {
      throw new ForbiddenException(
        'Você só pode iniciar uma conversa para você mesma.',
      );
    }

    const nutriz = await this.dataSource
      .getRepository(Nutriz)
      .findOneBy({ id: nutrizId });
    if (!nutriz) {
      throw new NotFoundException(`Nutriz #${nutrizId} não encontrada`);
    }

    const conversaAberta = await this.conversaRepository.findOne({
      where: { nutriz: { id: nutrizId }, status: ConversaStatus.ABERTA },
    });
    if (conversaAberta) {
      conversaAberta.status = ConversaStatus.ENCERRADA;
      await this.conversaRepository.save(conversaAberta);
    }

    const conversa = this.conversaRepository.create({ ...dados, nutriz });
    return toConversaResponseDto(await this.conversaRepository.save(conversa));
  }

  /**
   * Envia a mensagem da nutriz e já devolve a resposta da Lila na mesma
   * chamada, gerada em tempo real pelo Gemini com base no histórico da
   * conversa e nas perguntas frequentes cadastradas.
   */
  async enviarMensagem(
    conversaId: number,
    dto: EnviarMensagemDto,
    user: AuthUser,
  ): Promise<EnviarMensagemResponseDto> {
    const conversa = await this.conversaRepository.findOne({
      where: { id: conversaId },
      relations: { nutriz: true },
    });
    if (!conversa) {
      throw new NotFoundException(`Conversa #${conversaId} não encontrada`);
    }
    if (user.tipo === 'nutriz' && user.id !== conversa.nutriz.id) {
      throw new ForbiddenException(
        'Você não tem permissão para enviar mensagens nesta conversa.',
      );
    }
    if (conversa.status === ConversaStatus.ENCERRADA) {
      throw new BadRequestException(
        'Não é possível adicionar mensagens a uma conversa encerrada.',
      );
    }

    const { mensagemUsuario, mensagemBot } = await this.processarMensagem(
      conversa,
      dto.texto,
    );

    return {
      mensagemUsuario: toMensagemResponseDto(mensagemUsuario),
      respostaBot: toMensagemResponseDto(mensagemBot),
    };
  }

  /**
   * Recebe uma mensagem vinda do webhook do WhatsApp, identifica a nutriz
   * pelo telefone e devolve o texto da resposta da Lila para reenvio via
   * Evolution API. Números sem cadastro correspondente recebem um convite
   * para se cadastrar, sem persistir nada (não há nutriz para vincular).
   */
  async receberMensagemWhatsapp(
    telefone: string,
    texto: string,
  ): Promise<string | null> {
    const nutriz = await this.buscarNutrizPorTelefone(telefone);
    if (!nutriz) {
      return CONVITE_CADASTRO;
    }

    let conversa = await this.conversaRepository.findOne({
      where: {
        nutriz: { id: nutriz.id },
        canal: ConversaCanal.WHATSAPP,
        status: ConversaStatus.ABERTA,
      },
      relations: { nutriz: true },
    });

    if (!conversa) {
      conversa = await this.conversaRepository.save(
        this.conversaRepository.create({
          nutriz,
          canal: ConversaCanal.WHATSAPP,
        }),
      );
    }

    const { mensagemBot } = await this.processarMensagem(conversa, texto);
    return mensagemBot.texto;
  }

  /**
   * O telefone cadastrado pela nutriz e o número que chega no webhook do
   * WhatsApp raramente batem byte a byte (DDI, o 9º dígito do celular),
   * então a busca testa algumas variações plausíveis do mesmo número.
   */
  private async buscarNutrizPorTelefone(
    telefoneWhatsapp: string,
  ): Promise<Nutriz | null> {
    const digitos = telefoneWhatsapp.replace(/\D/g, '');
    const semDdi =
      digitos.startsWith('55') && digitos.length > 11
        ? digitos.slice(2)
        : digitos;
    const comNove =
      semDdi.length === 10
        ? `${semDdi.slice(0, 2)}9${semDdi.slice(2)}`
        : semDdi;
    const semNove =
      semDdi.length === 11 ? `${semDdi.slice(0, 2)}${semDdi.slice(3)}` : semDdi;

    const candidatos = [...new Set([digitos, semDdi, comNove, semNove])];

    return this.dataSource
      .getRepository(Nutriz)
      .createQueryBuilder('nutriz')
      .where(
        candidatos
          .map(
            (_, i) =>
              `REGEXP_REPLACE(nutriz.telefone, '[^0-9]', '') = :tel${i}`,
          )
          .join(' OR '),
        Object.fromEntries(candidatos.map((tel, i) => [`tel${i}`, tel])),
      )
      .getOne();
  }

  private async processarMensagem(
    conversa: Conversa,
    texto: string,
  ): Promise<{ mensagemUsuario: Mensagem; mensagemBot: Mensagem }> {
    const mensagemRepository = this.dataSource.getRepository(Mensagem);

    const historico = await mensagemRepository.find({
      where: { conversa: { id: conversa.id } },
      order: { timestamp: 'ASC' },
    });

    const mensagemUsuario = await mensagemRepository.save(
      mensagemRepository.create({
        remetente: MensagemRemetente.USUARIO,
        texto,
        conversa,
      }),
    );

    const respostaTexto = await this.lilaAiService.gerarResposta(
      historico,
      texto,
    );

    const mensagemBot = await mensagemRepository.save(
      mensagemRepository.create({
        remetente: MensagemRemetente.BOT,
        texto: respostaTexto,
        conversa,
      }),
    );

    return { mensagemUsuario, mensagemBot };
  }

  async findAll(): Promise<ConversaResponseDto[]> {
    const conversas = await this.conversaRepository.find({
      relations: { nutriz: true },
    });
    return conversas.map(toConversaResponseDto);
  }

  async findOne(id: number): Promise<ConversaResponseDto> {
    const conversa = await this.conversaRepository.findOne({
      where: { id },
      relations: { nutriz: true, mensagens: true },
    });
    if (!conversa) {
      throw new NotFoundException(`Conversa #${id} não encontrada`);
    }
    return toConversaResponseDto(conversa);
  }
}
