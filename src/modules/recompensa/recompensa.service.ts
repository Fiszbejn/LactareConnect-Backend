import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recompensa } from './entities/recompensa.entity';
import { CreateRecompensaDto } from './dto/create-recompensa.dto';
import { UpdateRecompensaDto } from './dto/update-recompensa.dto';

@Injectable()
export class RecompensaService {
  constructor(
    @InjectRepository(Recompensa)
    private readonly recompensaRepository: Repository<Recompensa>,
  ) {}

  create(createRecompensaDto: CreateRecompensaDto): Promise<Recompensa> {
    const recompensa = this.recompensaRepository.create(createRecompensaDto);
    return this.recompensaRepository.save(recompensa);
  }

  findAll(): Promise<Recompensa[]> {
    return this.recompensaRepository.find();
  }

  async findOne(id: number): Promise<Recompensa> {
    const recompensa = await this.recompensaRepository.findOne({
      where: { id },
    });
    if (!recompensa) {
      throw new NotFoundException(`Recompensa #${id} não encontrada`);
    }
    return recompensa;
  }

  async update(
    id: number,
    updateRecompensaDto: UpdateRecompensaDto,
  ): Promise<Recompensa> {
    const recompensa = await this.findOne(id);
    Object.assign(recompensa, updateRecompensaDto);
    return this.recompensaRepository.save(recompensa);
  }

  async remove(id: number): Promise<void> {
    const recompensa = await this.findOne(id);
    await this.recompensaRepository.remove(recompensa);
  }
}
