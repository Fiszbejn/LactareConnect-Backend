import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RelatorioGerado } from './entities/relatorio-gerado.entity';
import { Administrador } from '../administrador/entities/administrador.entity';
import { CreateRelatorioGeradoDto } from './dto/create-relatorio-gerado.dto';

@Injectable()
export class RelatorioGeradoService {
  constructor(
    @InjectRepository(RelatorioGerado)
    private readonly relatorioRepository: Repository<RelatorioGerado>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createRelatorioDto: CreateRelatorioGeradoDto,
  ): Promise<RelatorioGerado> {
    const { administradorId, ...dados } = createRelatorioDto;

    const administrador = await this.dataSource
      .getRepository(Administrador)
      .findOneBy({ id: administradorId });
    if (!administrador) {
      throw new NotFoundException(
        `Administrador #${administradorId} não encontrado`,
      );
    }

    const periodoInicio = new Date(dados.periodoInicio);
    const periodoFim = new Date(dados.periodoFim);
    if (periodoFim < periodoInicio) {
      throw new BadRequestException(
        'O período final não pode ser anterior ao período inicial.',
      );
    }

    const relatorio = this.relatorioRepository.create({
      ...dados,
      periodoInicio,
      periodoFim,
      administrador,
    });
    return this.relatorioRepository.save(relatorio);
  }

  findAll(): Promise<RelatorioGerado[]> {
    return this.relatorioRepository.find({
      relations: { administrador: true },
    });
  }

  async findOne(id: number): Promise<RelatorioGerado> {
    const relatorio = await this.relatorioRepository.findOne({
      where: { id },
      relations: { administrador: true },
    });
    if (!relatorio) {
      throw new NotFoundException(`Relatório #${id} não encontrado`);
    }
    return relatorio;
  }

  async remove(id: number): Promise<void> {
    const relatorio = await this.findOne(id);
    await this.relatorioRepository.remove(relatorio);
  }
}
