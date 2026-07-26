import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamePreDoacao } from './entities/exame-pre-doacao.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { CreateExamePreDoacaoDto } from './dto/create-exame-pre-doacao.dto';
import { UpdateExamePreDoacaoDto } from './dto/update-exame-pre-doacao.dto';

@Injectable()
export class ExamePreDoacaoService {
  constructor(
    @InjectRepository(ExamePreDoacao)
    private readonly exameRepository: Repository<ExamePreDoacao>,
  ) {}

  create(createExameDto: CreateExamePreDoacaoDto): Promise<ExamePreDoacao> {
    const { nutrizId, ...dados } = createExameDto;
    const exame = this.exameRepository.create({
      ...dados,
      nutriz: { id: nutrizId } as Nutriz,
    });
    return this.exameRepository.save(exame);
  }

  findAll(): Promise<ExamePreDoacao[]> {
    return this.exameRepository.find({ relations: { nutriz: true } });
  }

  async findOne(id: number): Promise<ExamePreDoacao> {
    const exame = await this.exameRepository.findOne({
      where: { id },
      relations: { nutriz: true },
    });
    if (!exame) {
      throw new NotFoundException(`Exame pré-doação #${id} não encontrado`);
    }
    return exame;
  }

  async update(
    id: number,
    updateExameDto: UpdateExamePreDoacaoDto,
  ): Promise<ExamePreDoacao> {
    const exame = await this.findOne(id);
    const { nutrizId, ...dados } = updateExameDto;
    Object.assign(exame, dados);
    if (nutrizId) {
      exame.nutriz = { id: nutrizId } as Nutriz;
    }
    return this.exameRepository.save(exame);
  }
}
