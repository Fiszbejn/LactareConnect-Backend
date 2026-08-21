import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransacaoGotinhas } from './entities/transacao-gotinhas.entity';
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
