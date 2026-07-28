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
import {
  RelatorioGeradoResponseDto,
  toRelatorioGeradoResponseDto,
} from './dto/relatorio-gerado-response.dto';

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
  ): Promise<RelatorioGeradoResponseDto> {
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
    return toRelatorioGeradoResponseDto(
      await this.relatorioRepository.save(relatorio),
    );
  }

  async findAll(): Promise<RelatorioGeradoResponseDto[]> {
    const relatorios = await this.relatorioRepository.find({
      relations: { administrador: true },
    });
    return relatorios.map(toRelatorioGeradoResponseDto);
  }

  private async buscarPorId(id: number): Promise<RelatorioGerado> {
    const relatorio = await this.relatorioRepository.findOne({
      where: { id },
      relations: { administrador: true },
    });
    if (!relatorio) {
      throw new NotFoundException(`Relatório #${id} não encontrado`);
    }
    return relatorio;
  }

  async findOne(id: number): Promise<RelatorioGeradoResponseDto> {
    return toRelatorioGeradoResponseDto(await this.buscarPorId(id));
  }

  async remove(id: number): Promise<void> {
    const relatorio = await this.buscarPorId(id);
    await this.relatorioRepository.remove(relatorio);
  }
}
