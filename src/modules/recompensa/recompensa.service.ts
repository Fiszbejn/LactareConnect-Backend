import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recompensa } from './entities/recompensa.entity';
import { CreateRecompensaDto } from './dto/create-recompensa.dto';
import { UpdateRecompensaDto } from './dto/update-recompensa.dto';
import { lancarConflitoSeViolarChaveEstrangeira } from '../../common/oracle-fk-constraint.util';
import {
  RecompensaResponseDto,
  toRecompensaResponseDto,
} from './dto/recompensa-response.dto';

@Injectable()
export class RecompensaService {
  constructor(
    @InjectRepository(Recompensa)
    private readonly recompensaRepository: Repository<Recompensa>,
  ) {}

  private async buscarPorId(id: number): Promise<Recompensa> {
    const recompensa = await this.recompensaRepository.findOne({
      where: { id },
    });
    if (!recompensa) {
      throw new NotFoundException(`Recompensa #${id} não encontrada`);
    }
    return recompensa;
  }

  async create(
    createRecompensaDto: CreateRecompensaDto,
  ): Promise<RecompensaResponseDto> {
    const recompensa = this.recompensaRepository.create(createRecompensaDto);
    return toRecompensaResponseDto(
      await this.recompensaRepository.save(recompensa),
    );
  }

  async findAll(): Promise<RecompensaResponseDto[]> {
    const recompensas = await this.recompensaRepository.find();
    return recompensas.map(toRecompensaResponseDto);
  }

  async findOne(id: number): Promise<RecompensaResponseDto> {
    return toRecompensaResponseDto(await this.buscarPorId(id));
  }

  async update(
    id: number,
    updateRecompensaDto: UpdateRecompensaDto,
  ): Promise<RecompensaResponseDto> {
    const recompensa = await this.buscarPorId(id);
    Object.assign(recompensa, updateRecompensaDto);
    return toRecompensaResponseDto(
      await this.recompensaRepository.save(recompensa),
    );
  }

  async remove(id: number): Promise<void> {
    const recompensa = await this.buscarPorId(id);
    try {
      await this.recompensaRepository.remove(recompensa);
    } catch (error) {
      lancarConflitoSeViolarChaveEstrangeira(
        error,
        `Não é possível remover a recompensa #${id} pois existem resgates vinculados a ela.`,
      );
    }
  }
}
