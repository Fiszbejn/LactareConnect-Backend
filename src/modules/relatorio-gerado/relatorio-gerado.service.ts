import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelatorioGerado } from './entities/relatorio-gerado.entity';
import { Administrador } from '../administrador/entities/administrador.entity';
import { CreateRelatorioGeradoDto } from './dto/create-relatorio-gerado.dto';

@Injectable()
export class RelatorioGeradoService {
  constructor(
    @InjectRepository(RelatorioGerado)
    private readonly relatorioRepository: Repository<RelatorioGerado>,
  ) {}

  create(
    createRelatorioDto: CreateRelatorioGeradoDto,
  ): Promise<RelatorioGerado> {
    const { administradorId, ...dados } = createRelatorioDto;
    const relatorio = this.relatorioRepository.create({
      ...dados,
      administrador: { id: administradorId } as Administrador,
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
