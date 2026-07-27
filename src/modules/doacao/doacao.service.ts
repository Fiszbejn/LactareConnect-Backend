import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Doacao } from './entities/doacao.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import {
  Agendamento,
  AgendamentoStatus,
} from '../agendamento/entities/agendamento.entity';
import {
  TransacaoGotinhas,
  TransacaoTipo,
} from '../transacao-gotinhas/entities/transacao-gotinhas.entity';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { UpdateDoacaoDto } from './dto/update-doacao.dto';
import { AuthUser } from '../auth/types/auth-user.type';

const GOTINHAS_POR_DOACAO = 100;

@Injectable()
export class DoacaoService {
  constructor(
    @InjectRepository(Doacao)
    private readonly doacaoRepository: Repository<Doacao>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  create(createDoacaoDto: CreateDoacaoDto, user: AuthUser): Promise<Doacao> {
    const { nutrizId, agendamentoId, ...dados } = createDoacaoDto;

    if (user.tipo === 'nutriz' && user.id !== nutrizId) {
      throw new ForbiddenException(
        'Você só pode registrar uma doação para você mesma.',
      );
    }

    return this.dataSource.transaction(async (manager) => {
      const agendamento = await manager.findOne(Agendamento, {
        where: { id: agendamentoId },
        relations: { nutriz: true },
      });
      if (!agendamento) {
        throw new NotFoundException(
          `Agendamento #${agendamentoId} não encontrado`,
        );
      }
      if (agendamento.status !== AgendamentoStatus.REALIZADO) {
        throw new BadRequestException(
          'Só é possível registrar uma doação a partir de um agendamento com status "realizado".',
        );
      }
      if (agendamento.nutriz.id !== nutrizId) {
        throw new BadRequestException(
          'O agendamento informado pertence a outra nutriz.',
        );
      }

      const doacaoExistente = await manager.findOne(Doacao, {
        where: { agendamento: { id: agendamentoId } },
      });
      if (doacaoExistente) {
        throw new ConflictException(
          `O agendamento #${agendamentoId} já possui uma doação registrada.`,
        );
      }

      const doacao = manager.create(Doacao, {
        ...dados,
        nutriz: { id: nutrizId } as Nutriz,
        agendamento: { id: agendamentoId } as Agendamento,
      });
      await manager.save(doacao);

      await manager.increment(
        Nutriz,
        { id: nutrizId },
        'saldoGotinhas',
        GOTINHAS_POR_DOACAO,
      );

      const transacao = manager.create(TransacaoGotinhas, {
        tipo: TransacaoTipo.DOACAO,
        valor: GOTINHAS_POR_DOACAO,
        nutriz: { id: nutrizId } as Nutriz,
      });
      await manager.save(transacao);

      return doacao;
    });
  }

  findAll(user: AuthUser): Promise<Doacao[]> {
    const where = user.tipo === 'nutriz' ? { nutriz: { id: user.id } } : {};
    return this.doacaoRepository.find({
      where,
      relations: { nutriz: true, agendamento: true },
    });
  }

  async findOne(id: number, user: AuthUser): Promise<Doacao> {
    const doacao = await this.doacaoRepository.findOne({
      where: { id },
      relations: { nutriz: true, agendamento: true },
    });
    if (!doacao) {
      throw new NotFoundException(`Doação #${id} não encontrada`);
    }
    if (user.tipo === 'nutriz' && user.id !== doacao.nutriz.id) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar esta doação.',
      );
    }
    return doacao;
  }

  async update(
    id: number,
    updateDoacaoDto: UpdateDoacaoDto,
    user: AuthUser,
  ): Promise<Doacao> {
    const doacao = await this.findOne(id, user);
    const { nutrizId, agendamentoId, ...dados } = updateDoacaoDto;
    Object.assign(doacao, dados);

    if (nutrizId) {
      if (user.tipo === 'nutriz' && user.id !== nutrizId) {
        throw new ForbiddenException(
          'Você não pode transferir esta doação para outra nutriz.',
        );
      }
      const nutriz = await this.dataSource
        .getRepository(Nutriz)
        .findOneBy({ id: nutrizId });
      if (!nutriz) {
        throw new NotFoundException(`Nutriz #${nutrizId} não encontrada`);
      }
      doacao.nutriz = nutriz;
    }
    if (agendamentoId) {
      const agendamento = await this.dataSource
        .getRepository(Agendamento)
        .findOneBy({ id: agendamentoId });
      if (!agendamento) {
        throw new NotFoundException(
          `Agendamento #${agendamentoId} não encontrado`,
        );
      }
      doacao.agendamento = agendamento;
    }
    return this.doacaoRepository.save(doacao);
  }
}
