import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  ExamePreDoacao,
  ExameStatus,
} from './entities/exame-pre-doacao.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { CreateExamePreDoacaoDto } from './dto/create-exame-pre-doacao.dto';
import { UpdateExamePreDoacaoDto } from './dto/update-exame-pre-doacao.dto';

@Injectable()
export class ExamePreDoacaoService {
  constructor(
    @InjectRepository(ExamePreDoacao)
    private readonly exameRepository: Repository<ExamePreDoacao>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createExameDto: CreateExamePreDoacaoDto,
  ): Promise<ExamePreDoacao> {
    const { nutrizId, ...dados } = createExameDto;

    const nutriz = await this.dataSource
      .getRepository(Nutriz)
      .findOneBy({ id: nutrizId });
    if (!nutriz) {
      throw new NotFoundException(`Nutriz #${nutrizId} não encontrada`);
    }
    if (dados.status === ExameStatus.OK && !dados.arquivoUrl) {
      throw new BadRequestException(
        'Um exame só pode ser marcado como "ok" quando um arquivo (arquivoUrl) for enviado.',
      );
    }

    const exame = this.exameRepository.create({ ...dados, nutriz });
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

    if (exame.status === ExameStatus.OK && !exame.arquivoUrl) {
      throw new BadRequestException(
        'Um exame só pode ser marcado como "ok" quando um arquivo (arquivoUrl) for enviado.',
      );
    }

    if (nutrizId) {
      const nutriz = await this.dataSource
        .getRepository(Nutriz)
        .findOneBy({ id: nutrizId });
      if (!nutriz) {
        throw new NotFoundException(`Nutriz #${nutrizId} não encontrada`);
      }
      exame.nutriz = nutriz;
    }
    return this.exameRepository.save(exame);
  }
}
