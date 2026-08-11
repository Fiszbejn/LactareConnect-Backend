import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Conversa, ConversaStatus } from './entities/conversa.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { Mensagem, MensagemRemetente } from '../mensagem/entities/mensagem.entity';
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

    const mensagemRepository = this.dataSource.getRepository(Mensagem);

    const historico = await mensagemRepository.find({
      where: { conversa: { id: conversaId } },
      order: { timestamp: 'ASC' },
    });

    const mensagemUsuario = await mensagemRepository.save(
      mensagemRepository.create({
        remetente: MensagemRemetente.USUARIO,
        texto: dto.texto,
        conversa,
      }),
    );

    const respostaTexto = await this.lilaAiService.gerarResposta(
      historico,
      dto.texto,
    );

    const mensagemBot = await mensagemRepository.save(
      mensagemRepository.create({
        remetente: MensagemRemetente.BOT,
        texto: respostaTexto,
        conversa,
      }),
    );

    return {
      mensagemUsuario: toMensagemResponseDto(mensagemUsuario),
      respostaBot: toMensagemResponseDto(mensagemBot),
    };
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
