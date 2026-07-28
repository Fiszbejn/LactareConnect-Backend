import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransacaoGotinhas } from './entities/transacao-gotinhas.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { CreateTransacaoGotinhasDto } from './dto/create-transacao-gotinhas.dto';
import {
  TransacaoGotinhasResponseDto,
  toTransacaoGotinhasResponseDto,
} from './dto/transacao-gotinhas-response.dto';

@Injectable()
export class TransacaoGotinhasService {
  constructor(
    @InjectRepository(TransacaoGotinhas)
    private readonly transacaoRepository: Repository<TransacaoGotinhas>,
  ) {}

  /** Sem rota HTTP própria — chamado internamente pelos services de Doacao/Resgate para creditar/debitar gotinhas. */
  async create(
    createTransacaoDto: CreateTransacaoGotinhasDto,
  ): Promise<TransacaoGotinhasResponseDto> {
    const { nutrizId, ...dados } = createTransacaoDto;
    const transacao = this.transacaoRepository.create({
      ...dados,
      nutriz: { id: nutrizId } as Nutriz,
    });
    return toTransacaoGotinhasResponseDto(
      await this.transacaoRepository.save(transacao),
    );
  }

  async findAll(): Promise<TransacaoGotinhasResponseDto[]> {
    const transacoes = await this.transacaoRepository.find({
      relations: { nutriz: true },
    });
    return transacoes.map(toTransacaoGotinhasResponseDto);
  }

  async findOne(id: number): Promise<TransacaoGotinhasResponseDto> {
    const transacao = await this.transacaoRepository.findOne({
      where: { id },
      relations: { nutriz: true },
    });
    if (!transacao) {
      throw new NotFoundException(
        `Transação de gotinhas #${id} não encontrada`,
      );
    }
    return toTransacaoGotinhasResponseDto(transacao);
  }
}
