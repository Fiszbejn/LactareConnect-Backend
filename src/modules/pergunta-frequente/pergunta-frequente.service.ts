import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerguntaFrequente } from './entities/pergunta-frequente.entity';
import { CreatePerguntaFrequenteDto } from './dto/create-pergunta-frequente.dto';
import { UpdatePerguntaFrequenteDto } from './dto/update-pergunta-frequente.dto';

@Injectable()
export class PerguntaFrequenteService {
  constructor(
    @InjectRepository(PerguntaFrequente)
    private readonly perguntaRepository: Repository<PerguntaFrequente>,
  ) {}

  create(
    createPerguntaDto: CreatePerguntaFrequenteDto,
  ): Promise<PerguntaFrequente> {
    const pergunta = this.perguntaRepository.create(createPerguntaDto);
    return this.perguntaRepository.save(pergunta);
  }

  findAll(): Promise<PerguntaFrequente[]> {
    return this.perguntaRepository.find({ order: { ordem: 'ASC' } });
  }

  async findOne(id: number): Promise<PerguntaFrequente> {
    const pergunta = await this.perguntaRepository.findOne({ where: { id } });
    if (!pergunta) {
      throw new NotFoundException(`Pergunta frequente #${id} não encontrada`);
    }
    return pergunta;
  }

  async update(
    id: number,
    updatePerguntaDto: UpdatePerguntaFrequenteDto,
  ): Promise<PerguntaFrequente> {
    const pergunta = await this.findOne(id);
    Object.assign(pergunta, updatePerguntaDto);
    return this.perguntaRepository.save(pergunta);
  }

  async remove(id: number): Promise<void> {
    const pergunta = await this.findOne(id);
    await this.perguntaRepository.remove(pergunta);
  }
}
