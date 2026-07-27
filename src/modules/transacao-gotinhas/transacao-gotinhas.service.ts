import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransacaoGotinhas } from './entities/transacao-gotinhas.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { CreateTransacaoGotinhasDto } from './dto/create-transacao-gotinhas.dto';

@Injectable()
export class TransacaoGotinhasService {
  constructor(
    @InjectRepository(TransacaoGotinhas)
    private readonly transacaoRepository: Repository<TransacaoGotinhas>,
  ) {}

  /** Sem rota HTTP própria — chamado internamente pelos services de Doacao/Resgate para creditar/debitar gotinhas. */
  create(
    createTransacaoDto: CreateTransacaoGotinhasDto,
  ): Promise<TransacaoGotinhas> {
    const { nutrizId, ...dados } = createTransacaoDto;
    const transacao = this.transacaoRepository.create({
      ...dados,
      nutriz: { id: nutrizId } as Nutriz,
    });
    return this.transacaoRepository.save(transacao);
  }

  findAll(): Promise<TransacaoGotinhas[]> {
    return this.transacaoRepository.find({ relations: { nutriz: true } });
  }

  async findOne(id: number): Promise<TransacaoGotinhas> {
    const transacao = await this.transacaoRepository.findOne({
      where: { id },
      relations: { nutriz: true },
    });
    if (!transacao) {
      throw new NotFoundException(
        `Transação de gotinhas #${id} não encontrada`,
      );
    }
    return transacao;
  }
}
