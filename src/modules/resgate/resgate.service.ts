import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resgate } from './entities/resgate.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { Recompensa } from '../recompensa/entities/recompensa.entity';
import { CreateResgateDto } from './dto/create-resgate.dto';
import { UpdateResgateDto } from './dto/update-resgate.dto';

@Injectable()
export class ResgateService {
  constructor(
    @InjectRepository(Resgate)
    private readonly resgateRepository: Repository<Resgate>,
  ) {}

  create(createResgateDto: CreateResgateDto): Promise<Resgate> {
    const { nutrizId, recompensaId, ...dados } = createResgateDto;
    const resgate = this.resgateRepository.create({
      ...dados,
      nutriz: { id: nutrizId } as Nutriz,
      recompensa: { id: recompensaId } as Recompensa,
    });
    return this.resgateRepository.save(resgate);
  }

  findAll(): Promise<Resgate[]> {
    return this.resgateRepository.find({
      relations: { nutriz: true, recompensa: true },
    });
  }

  async findOne(id: number): Promise<Resgate> {
    const resgate = await this.resgateRepository.findOne({
      where: { id },
      relations: { nutriz: true, recompensa: true },
    });
    if (!resgate) {
      throw new NotFoundException(`Resgate #${id} não encontrado`);
    }
    return resgate;
  }

  async update(
    id: number,
    updateResgateDto: UpdateResgateDto,
  ): Promise<Resgate> {
    const resgate = await this.findOne(id);
    const { nutrizId, recompensaId, ...dados } = updateResgateDto;
    Object.assign(resgate, dados);
    if (nutrizId) {
      resgate.nutriz = { id: nutrizId } as Nutriz;
    }
    if (recompensaId) {
      resgate.recompensa = { id: recompensaId } as Recompensa;
    }
    return this.resgateRepository.save(resgate);
  }
}
