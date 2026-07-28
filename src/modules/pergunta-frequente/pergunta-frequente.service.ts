import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerguntaFrequente } from './entities/pergunta-frequente.entity';
import { CreatePerguntaFrequenteDto } from './dto/create-pergunta-frequente.dto';
import { UpdatePerguntaFrequenteDto } from './dto/update-pergunta-frequente.dto';
import {
  PerguntaFrequenteResponseDto,
  toPerguntaFrequenteResponseDto,
} from './dto/pergunta-frequente-response.dto';

@Injectable()
export class PerguntaFrequenteService {
  constructor(
    @InjectRepository(PerguntaFrequente)
    private readonly perguntaRepository: Repository<PerguntaFrequente>,
  ) {}

  private async buscarPorId(id: number): Promise<PerguntaFrequente> {
    const pergunta = await this.perguntaRepository.findOne({ where: { id } });
    if (!pergunta) {
      throw new NotFoundException(`Pergunta frequente #${id} não encontrada`);
    }
    return pergunta;
  }

  async create(
    createPerguntaDto: CreatePerguntaFrequenteDto,
  ): Promise<PerguntaFrequenteResponseDto> {
    const pergunta = this.perguntaRepository.create(createPerguntaDto);
    return toPerguntaFrequenteResponseDto(
      await this.perguntaRepository.save(pergunta),
    );
  }

  async findAll(): Promise<PerguntaFrequenteResponseDto[]> {
    const perguntas = await this.perguntaRepository.find({
      order: { ordem: 'ASC' },
    });
    return perguntas.map(toPerguntaFrequenteResponseDto);
  }

  async findOne(id: number): Promise<PerguntaFrequenteResponseDto> {
    return toPerguntaFrequenteResponseDto(await this.buscarPorId(id));
  }

  async update(
    id: number,
    updatePerguntaDto: UpdatePerguntaFrequenteDto,
  ): Promise<PerguntaFrequenteResponseDto> {
    const pergunta = await this.buscarPorId(id);
    Object.assign(pergunta, updatePerguntaDto);
    return toPerguntaFrequenteResponseDto(
      await this.perguntaRepository.save(pergunta),
    );
  }

  async remove(id: number): Promise<void> {
    const pergunta = await this.buscarPorId(id);
    await this.perguntaRepository.remove(pergunta);
  }
}
