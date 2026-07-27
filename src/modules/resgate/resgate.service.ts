import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Resgate } from './entities/resgate.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { Recompensa } from '../recompensa/entities/recompensa.entity';
import {
  TransacaoGotinhas,
  TransacaoTipo,
} from '../transacao-gotinhas/entities/transacao-gotinhas.entity';
import { CreateResgateDto } from './dto/create-resgate.dto';
import { UpdateResgateDto } from './dto/update-resgate.dto';
import { AuthUser } from '../auth/types/auth-user.type';

@Injectable()
export class ResgateService {
  constructor(
    @InjectRepository(Resgate)
    private readonly resgateRepository: Repository<Resgate>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  create(createResgateDto: CreateResgateDto, user: AuthUser): Promise<Resgate> {
    const { nutrizId, recompensaId, ...dados } = createResgateDto;

    if (user.tipo === 'nutriz' && user.id !== nutrizId) {
      throw new ForbiddenException(
        'Você só pode resgatar uma recompensa para você mesma.',
      );
    }

    return this.dataSource.transaction(async (manager) => {
      const nutriz = await manager.findOneBy(Nutriz, { id: nutrizId });
      if (!nutriz) {
        throw new NotFoundException(`Nutriz #${nutrizId} não encontrada`);
      }

      const recompensa = await manager.findOneBy(Recompensa, {
        id: recompensaId,
      });
      if (!recompensa) {
        throw new NotFoundException(
          `Recompensa #${recompensaId} não encontrada`,
        );
      }

      if (!recompensa.ativo) {
        throw new BadRequestException(
          'Recompensa está inativa e não pode ser resgatada.',
        );
      }
      if (recompensa.estoque <= 0) {
        throw new BadRequestException('Recompensa sem estoque disponível.');
      }
      if (nutriz.saldoGotinhas < recompensa.custoGotinhas) {
        throw new BadRequestException(
          'Saldo de gotinhas insuficiente para este resgate.',
        );
      }

      const resgate = manager.create(Resgate, {
        ...dados,
        nutriz: { id: nutrizId } as Nutriz,
        recompensa: { id: recompensaId } as Recompensa,
      });
      await manager.save(resgate);

      await manager.decrement(
        Nutriz,
        { id: nutrizId },
        'saldoGotinhas',
        recompensa.custoGotinhas,
      );
      await manager.decrement(Recompensa, { id: recompensaId }, 'estoque', 1);

      const transacao = manager.create(TransacaoGotinhas, {
        tipo: TransacaoTipo.RESGATE,
        valor: -recompensa.custoGotinhas,
        nutriz: { id: nutrizId } as Nutriz,
      });
      await manager.save(transacao);

      return resgate;
    });
  }

  findAll(user: AuthUser): Promise<Resgate[]> {
    const where = user.tipo === 'nutriz' ? { nutriz: { id: user.id } } : {};
    return this.resgateRepository.find({
      where,
      relations: { nutriz: true, recompensa: true },
    });
  }

  async findOne(id: number, user: AuthUser): Promise<Resgate> {
    const resgate = await this.resgateRepository.findOne({
      where: { id },
      relations: { nutriz: true, recompensa: true },
    });
    if (!resgate) {
      throw new NotFoundException(`Resgate #${id} não encontrado`);
    }
    if (user.tipo === 'nutriz' && user.id !== resgate.nutriz.id) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este resgate.',
      );
    }
    return resgate;
  }

  async update(
    id: number,
    updateResgateDto: UpdateResgateDto,
    user: AuthUser,
  ): Promise<Resgate> {
    const resgate = await this.findOne(id, user);
    const { nutrizId, recompensaId, ...dados } = updateResgateDto;
    Object.assign(resgate, dados);

    if (nutrizId) {
      if (user.tipo === 'nutriz' && user.id !== nutrizId) {
        throw new ForbiddenException(
          'Você não pode transferir este resgate para outra nutriz.',
        );
      }
      const nutriz = await this.dataSource
        .getRepository(Nutriz)
        .findOneBy({ id: nutrizId });
      if (!nutriz) {
        throw new NotFoundException(`Nutriz #${nutrizId} não encontrada`);
      }
      resgate.nutriz = nutriz;
    }
    if (recompensaId) {
      const recompensa = await this.dataSource
        .getRepository(Recompensa)
        .findOneBy({ id: recompensaId });
      if (!recompensa) {
        throw new NotFoundException(
          `Recompensa #${recompensaId} não encontrada`,
        );
      }
      resgate.recompensa = recompensa;
    }
    return this.resgateRepository.save(resgate);
  }
}
