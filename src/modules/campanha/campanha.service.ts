import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campanha } from './entities/campanha.entity';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { UpdateCampanhaDto } from './dto/update-campanha.dto';
import {
  CampanhaResponseDto,
  toCampanhaResponseDto,
} from './dto/campanha-response.dto';

@Injectable()
export class CampanhaService {
  constructor(
    @InjectRepository(Campanha)
    private readonly campanhaRepository: Repository<Campanha>,
  ) {}

  private async buscarPorId(id: number): Promise<Campanha> {
    const campanha = await this.campanhaRepository.findOne({ where: { id } });
    if (!campanha) {
      throw new NotFoundException(`Campanha #${id} não encontrada`);
    }
    return campanha;
  }

  async create(
    createCampanhaDto: CreateCampanhaDto,
  ): Promise<CampanhaResponseDto> {
    const campanha = this.campanhaRepository.create(createCampanhaDto);
    return toCampanhaResponseDto(await this.campanhaRepository.save(campanha));
  }

  async findAll(): Promise<CampanhaResponseDto[]> {
    const campanhas = await this.campanhaRepository.find();
    return campanhas.map(toCampanhaResponseDto);
  }

  async findOne(id: number): Promise<CampanhaResponseDto> {
    return toCampanhaResponseDto(await this.buscarPorId(id));
  }

  async update(
    id: number,
    updateCampanhaDto: UpdateCampanhaDto,
  ): Promise<CampanhaResponseDto> {
    const campanha = await this.buscarPorId(id);
    Object.assign(campanha, updateCampanhaDto);
    return toCampanhaResponseDto(await this.campanhaRepository.save(campanha));
  }

  async remove(id: number): Promise<void> {
    const campanha = await this.buscarPorId(id);
    await this.campanhaRepository.remove(campanha);
  }
}
