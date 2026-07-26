import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Administrador } from './entities/administrador.entity';
import { BancoLeiteLactare } from '../banco-leite/entities/banco-leite.entity';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';

@Injectable()
export class AdministradorService {
  constructor(
    @InjectRepository(Administrador)
    private readonly administradorRepository: Repository<Administrador>,
  ) {}

  async create(
    createAdministradorDto: CreateAdministradorDto,
  ): Promise<Administrador> {
    const { senha, bancoVinculadoId, ...dados } = createAdministradorDto;
    const senhaHash = await bcrypt.hash(senha, 10);
    const administrador = this.administradorRepository.create({
      ...dados,
      senhaHash,
      bancoVinculado: bancoVinculadoId ? { id: bancoVinculadoId } : undefined,
    });
    return this.administradorRepository.save(administrador);
  }

  findAll(): Promise<Administrador[]> {
    return this.administradorRepository.find({
      relations: { bancoVinculado: true },
    });
  }

  async findOne(id: number): Promise<Administrador> {
    const administrador = await this.administradorRepository.findOne({
      where: { id },
      relations: { bancoVinculado: true },
    });
    if (!administrador) {
      throw new NotFoundException(`Administrador #${id} não encontrado`);
    }
    return administrador;
  }

  async update(
    id: number,
    updateAdministradorDto: UpdateAdministradorDto,
  ): Promise<Administrador> {
    const administrador = await this.findOne(id);
    const { senha, bancoVinculadoId, ...dados } = updateAdministradorDto;
    Object.assign(administrador, dados);
    if (senha) {
      administrador.senhaHash = await bcrypt.hash(senha, 10);
    }
    if (bancoVinculadoId) {
      administrador.bancoVinculado = {
        id: bancoVinculadoId,
      } as BancoLeiteLactare;
    }
    return this.administradorRepository.save(administrador);
  }

  async remove(id: number): Promise<void> {
    const administrador = await this.findOne(id);
    await this.administradorRepository.remove(administrador);
  }
}
