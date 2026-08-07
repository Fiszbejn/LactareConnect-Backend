import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Agendamento } from './entities/agendamento.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { BancoLeiteLactare } from '../banco-leite/entities/banco-leite.entity';
import {
  ExamePreDoacao,
  ExameStatus,
  ExameTipo,
} from '../exame-pre-doacao/entities/exame-pre-doacao.entity';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { AuthUser } from '../auth/types/auth-user.type';
import {
  AgendamentoResponseDto,
  toAgendamentoResponseDto,
} from './dto/agendamento-response.dto';

const EXAMES_OBRIGATORIOS = [
  ExameTipo.HEMOGRAMA,
  ExameTipo.SOROLOGIA_HIV,
  ExameTipo.VDRL,
  ExameTipo.SOROLOGIA_HEPATITES_B_C,
];

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectRepository(Agendamento)
    private readonly agendamentoRepository: Repository<Agendamento>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createAgendamentoDto: CreateAgendamentoDto,
    user: AuthUser,
  ): Promise<AgendamentoResponseDto> {
    const { nutrizId, bancoId, ...dados } = createAgendamentoDto;

    if (user.tipo === 'nutriz' && user.id !== nutrizId) {
      throw new ForbiddenException(
        'Você só pode agendar uma coleta para você mesma.',
      );
    }

    const nutriz = await this.dataSource
      .getRepository(Nutriz)
      .findOneBy({ id: nutrizId });
    if (!nutriz) {
      throw new NotFoundException(`Nutriz #${nutrizId} não encontrada`);
    }
    const banco = await this.dataSource
      .getRepository(BancoLeiteLactare)
      .findOneBy({ id: bancoId });
    if (!banco) {
      throw new NotFoundException(`Banco de leite #${bancoId} não encontrado`);
    }

    const examesOk = await this.dataSource.getRepository(ExamePreDoacao).find({
      where: { nutriz: { id: nutrizId }, status: ExameStatus.OK },
    });
    const tiposRealizados = new Set(examesOk.map((exame) => exame.tipoExame));
    const examesFaltando = EXAMES_OBRIGATORIOS.filter(
      (tipo) => !tiposRealizados.has(tipo),
    );
    if (examesFaltando.length > 0) {
      throw new BadRequestException(
        `Não é possível agendar: exames obrigatórios pendentes (${examesFaltando.join(', ')}).`,
      );
    }

    const agendamento = this.agendamentoRepository.create({
      ...dados,
      dataColeta: new Date(dados.dataColeta),
      nutriz,
      banco,
    });
    return toAgendamentoResponseDto(
      await this.agendamentoRepository.save(agendamento),
    );
  }

  async findAll(user: AuthUser): Promise<AgendamentoResponseDto[]> {
    const where = user.tipo === 'nutriz' ? { nutriz: { id: user.id } } : {};
    const agendamentos = await this.agendamentoRepository.find({
      where,
      relations: { nutriz: true, banco: true, doacao: true },
    });
    return agendamentos.map(toAgendamentoResponseDto);
  }

  private async buscarPorId(id: number, user: AuthUser): Promise<Agendamento> {
    const agendamento = await this.agendamentoRepository.findOne({
      where: { id },
      relations: { nutriz: true, banco: true, doacao: true },
    });
    if (!agendamento) {
      throw new NotFoundException(`Agendamento #${id} não encontrado`);
    }
    if (user.tipo === 'nutriz' && user.id !== agendamento.nutriz.id) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este agendamento.',
      );
    }
    return agendamento;
  }

  async findOne(id: number, user: AuthUser): Promise<AgendamentoResponseDto> {
    return toAgendamentoResponseDto(await this.buscarPorId(id, user));
  }

  async update(
    id: number,
    updateAgendamentoDto: UpdateAgendamentoDto,
    user: AuthUser,
  ): Promise<AgendamentoResponseDto> {
    const agendamento = await this.buscarPorId(id, user);
    const { nutrizId, bancoId, ...dados } = updateAgendamentoDto;
    Object.assign(agendamento, dados);
    if (dados.dataColeta) {
      agendamento.dataColeta = new Date(dados.dataColeta);
    }
    if (nutrizId) {
      if (user.tipo === 'nutriz' && user.id !== nutrizId) {
        throw new ForbiddenException(
          'Você não pode transferir este agendamento para outra nutriz.',
        );
      }
      const nutriz = await this.dataSource
        .getRepository(Nutriz)
        .findOneBy({ id: nutrizId });
      if (!nutriz) {
        throw new NotFoundException(`Nutriz #${nutrizId} não encontrada`);
      }
      agendamento.nutriz = nutriz;
    }
    if (bancoId) {
      const banco = await this.dataSource
        .getRepository(BancoLeiteLactare)
        .findOneBy({ id: bancoId });
      if (!banco) {
        throw new NotFoundException(
          `Banco de leite #${bancoId} não encontrado`,
        );
      }
      agendamento.banco = banco;
    }
    return toAgendamentoResponseDto(
      await this.agendamentoRepository.save(agendamento),
    );
  }
}
