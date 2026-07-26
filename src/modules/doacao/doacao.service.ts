import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doacao } from './entities/doacao.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { Agendamento } from '../agendamento/entities/agendamento.entity';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { UpdateDoacaoDto } from './dto/update-doacao.dto';

@Injectable()
export class DoacaoService {
  constructor(
    @InjectRepository(Doacao)
    private readonly doacaoRepository: Repository<Doacao>,
  ) {}

  create(createDoacaoDto: CreateDoacaoDto): Promise<Doacao> {
    const { nutrizId, agendamentoId, ...dados } = createDoacaoDto;
    const doacao = this.doacaoRepository.create({
      ...dados,
      nutriz: { id: nutrizId } as Nutriz,
      agendamento: agendamentoId ? { id: agendamentoId } : undefined,
    });
    return this.doacaoRepository.save(doacao);
  }

  findAll(): Promise<Doacao[]> {
    return this.doacaoRepository.find({
      relations: { nutriz: true, agendamento: true },
    });
  }

  async findOne(id: number): Promise<Doacao> {
    const doacao = await this.doacaoRepository.findOne({
      where: { id },
      relations: { nutriz: true, agendamento: true },
    });
    if (!doacao) {
      throw new NotFoundException(`Doação #${id} não encontrada`);
    }
    return doacao;
  }

  async update(id: number, updateDoacaoDto: UpdateDoacaoDto): Promise<Doacao> {
    const doacao = await this.findOne(id);
    const { nutrizId, agendamentoId, ...dados } = updateDoacaoDto;
    Object.assign(doacao, dados);
    if (nutrizId) {
      doacao.nutriz = { id: nutrizId } as Nutriz;
    }
    if (agendamentoId) {
      doacao.agendamento = { id: agendamentoId } as Agendamento;
    }
    return this.doacaoRepository.save(doacao);
  }
}
