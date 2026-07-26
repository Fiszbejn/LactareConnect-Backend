import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Nutriz } from './entities/nutriz.entity';
import { CreateNutrizDto } from './dto/create-nutriz.dto';
import { UpdateNutrizDto } from './dto/update-nutriz.dto';

@Injectable()
export class NutrizService {
  constructor(
    @InjectRepository(Nutriz)
    private readonly nutrizRepository: Repository<Nutriz>,
  ) {}

  async create(createNutrizDto: CreateNutrizDto): Promise<Nutriz> {
    const { senha, ...dados } = createNutrizDto;
    const senhaHash = await bcrypt.hash(senha, 10);
    const nutriz = this.nutrizRepository.create({ ...dados, senhaHash });
    return this.nutrizRepository.save(nutriz);
  }

  findAll(): Promise<Nutriz[]> {
    return this.nutrizRepository.find({
      relations: { endereco: true, preferencias: true },
    });
  }

  async findOne(id: number): Promise<Nutriz> {
    const nutriz = await this.nutrizRepository.findOne({
      where: { id },
      relations: { endereco: true, preferencias: true },
    });
    if (!nutriz) {
      throw new NotFoundException(`Nutriz #${id} não encontrada`);
    }
    return nutriz;
  }

  async update(id: number, updateNutrizDto: UpdateNutrizDto): Promise<Nutriz> {
    const nutriz = await this.findOne(id);
    const { senha, ...dados } = updateNutrizDto;
    Object.assign(nutriz, dados);
    if (senha) {
      nutriz.senhaHash = await bcrypt.hash(senha, 10);
    }
    return this.nutrizRepository.save(nutriz);
  }

  async remove(id: number): Promise<void> {
    const nutriz = await this.findOne(id);
    await this.nutrizRepository.remove(nutriz);
  }
}
