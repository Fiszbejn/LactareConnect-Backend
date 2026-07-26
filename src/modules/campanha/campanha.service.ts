import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campanha } from './entities/campanha.entity';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { UpdateCampanhaDto } from './dto/update-campanha.dto';

@Injectable()
export class CampanhaService {
  constructor(
    @InjectRepository(Campanha)
    private readonly campanhaRepository: Repository<Campanha>,
  ) {}

  create(createCampanhaDto: CreateCampanhaDto): Promise<Campanha> {
    const campanha = this.campanhaRepository.create(createCampanhaDto);
    return this.campanhaRepository.save(campanha);
  }

  findAll(): Promise<Campanha[]> {
    return this.campanhaRepository.find();
  }

  async findOne(id: number): Promise<Campanha> {
    const campanha = await this.campanhaRepository.findOne({ where: { id } });
    if (!campanha) {
      throw new NotFoundException(`Campanha #${id} não encontrada`);
    }
    return campanha;
  }

  async update(
    id: number,
    updateCampanhaDto: UpdateCampanhaDto,
  ): Promise<Campanha> {
    const campanha = await this.findOne(id);
    Object.assign(campanha, updateCampanhaDto);
    return this.campanhaRepository.save(campanha);
  }

  async remove(id: number): Promise<void> {
    const campanha = await this.findOne(id);
    await this.campanhaRepository.remove(campanha);
  }
}
