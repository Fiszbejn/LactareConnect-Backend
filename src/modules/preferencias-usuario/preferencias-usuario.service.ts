import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PreferenciasUsuario } from './entities/preferencias-usuario.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { CreatePreferenciasUsuarioDto } from './dto/create-preferencias-usuario.dto';
import { UpdatePreferenciasUsuarioDto } from './dto/update-preferencias-usuario.dto';

@Injectable()
export class PreferenciasUsuarioService {
  constructor(
    @InjectRepository(PreferenciasUsuario)
    private readonly preferenciasRepository: Repository<PreferenciasUsuario>,
  ) {}

  create(
    createPreferenciasUsuarioDto: CreatePreferenciasUsuarioDto,
  ): Promise<PreferenciasUsuario> {
    const { nutrizId, ...dados } = createPreferenciasUsuarioDto;
    const preferencias = this.preferenciasRepository.create({
      ...dados,
      nutriz: { id: nutrizId } as Nutriz,
    });
    return this.preferenciasRepository.save(preferencias);
  }

  findAll(): Promise<PreferenciasUsuario[]> {
    return this.preferenciasRepository.find({ relations: { nutriz: true } });
  }

  async findOne(id: number): Promise<PreferenciasUsuario> {
    const preferencias = await this.preferenciasRepository.findOne({
      where: { id },
      relations: { nutriz: true },
    });
    if (!preferencias) {
      throw new NotFoundException(`Preferências #${id} não encontradas`);
    }
    return preferencias;
  }

  async update(
    id: number,
    updatePreferenciasUsuarioDto: UpdatePreferenciasUsuarioDto,
  ): Promise<PreferenciasUsuario> {
    const preferencias = await this.findOne(id);
    const { nutrizId, ...dados } = updatePreferenciasUsuarioDto;
    Object.assign(preferencias, dados);
    if (nutrizId) {
      preferencias.nutriz = { id: nutrizId } as Nutriz;
    }
    return this.preferenciasRepository.save(preferencias);
  }
}
