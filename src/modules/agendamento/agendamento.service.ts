import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agendamento } from './entities/agendamento.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { BancoLeiteLactare } from '../banco-leite/entities/banco-leite.entity';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectRepository(Agendamento)
    private readonly agendamentoRepository: Repository<Agendamento>,
  ) {}

  create(createAgendamentoDto: CreateAgendamentoDto): Promise<Agendamento> {
    const { nutrizId, bancoId, ...dados } = createAgendamentoDto;
    const agendamento = this.agendamentoRepository.create({
      ...dados,
      nutriz: { id: nutrizId } as Nutriz,
      banco: { id: bancoId } as BancoLeiteLactare,
    });
    return this.agendamentoRepository.save(agendamento);
  }

  findAll(): Promise<Agendamento[]> {
    return this.agendamentoRepository.find({
      relations: { nutriz: true, banco: true },
    });
  }

  async findOne(id: number): Promise<Agendamento> {
    const agendamento = await this.agendamentoRepository.findOne({
      where: { id },
      relations: { nutriz: true, banco: true, doacao: true },
    });
    if (!agendamento) {
      throw new NotFoundException(`Agendamento #${id} não encontrado`);
    }
    return agendamento;
  }

  async update(
    id: number,
    updateAgendamentoDto: UpdateAgendamentoDto,
  ): Promise<Agendamento> {
    const agendamento = await this.findOne(id);
    const { nutrizId, bancoId, ...dados } = updateAgendamentoDto;
    Object.assign(agendamento, dados);
    if (nutrizId) {
      agendamento.nutriz = { id: nutrizId } as Nutriz;
    }
    if (bancoId) {
      agendamento.banco = { id: bancoId } as BancoLeiteLactare;
    }
    return this.agendamentoRepository.save(agendamento);
  }
}
