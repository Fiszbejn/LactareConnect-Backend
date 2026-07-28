import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Administrador } from './entities/administrador.entity';
import { BancoLeiteLactare } from '../banco-leite/entities/banco-leite.entity';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';
import {
  AdministradorResponseDto,
  toAdministradorResponseDto,
} from './dto/administrador-response.dto';

@Injectable()
export class AdministradorService {
  constructor(
    @InjectRepository(Administrador)
    private readonly administradorRepository: Repository<Administrador>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createAdministradorDto: CreateAdministradorDto,
  ): Promise<AdministradorResponseDto> {
    const { senha, bancoVinculadoId, ...dados } = createAdministradorDto;

    const existente = await this.administradorRepository.findOneBy({
      email: dados.email,
    });
    if (existente) {
      throw new ConflictException(
        `Já existe um administrador cadastrado com o email ${dados.email}`,
      );
    }

    let bancoVinculado: BancoLeiteLactare | undefined;
    if (bancoVinculadoId) {
      const banco = await this.dataSource
        .getRepository(BancoLeiteLactare)
        .findOneBy({ id: bancoVinculadoId });
      if (!banco) {
        throw new NotFoundException(
          `Banco de leite #${bancoVinculadoId} não encontrado`,
        );
      }
      bancoVinculado = banco;
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const administrador = this.administradorRepository.create({
      ...dados,
      senhaHash,
      bancoVinculado,
    });
    return toAdministradorResponseDto(
      await this.administradorRepository.save(administrador),
    );
  }

  async findAll(): Promise<AdministradorResponseDto[]> {
    const administradores = await this.administradorRepository.find({
      relations: { bancoVinculado: true },
    });
    return administradores.map(toAdministradorResponseDto);
  }

  private async buscarPorId(id: number): Promise<Administrador> {
    const administrador = await this.administradorRepository.findOne({
      where: { id },
      relations: { bancoVinculado: true },
    });
    if (!administrador) {
      throw new NotFoundException(`Administrador #${id} não encontrado`);
    }
    return administrador;
  }

  async findOne(id: number): Promise<AdministradorResponseDto> {
    return toAdministradorResponseDto(await this.buscarPorId(id));
  }

  async update(
    id: number,
    updateAdministradorDto: UpdateAdministradorDto,
  ): Promise<AdministradorResponseDto> {
    const administrador = await this.buscarPorId(id);
    const { senha, bancoVinculadoId, ...dados } = updateAdministradorDto;
    Object.assign(administrador, dados);
    if (senha) {
      administrador.senhaHash = await bcrypt.hash(senha, 10);
    }
    if (bancoVinculadoId) {
      const banco = await this.dataSource
        .getRepository(BancoLeiteLactare)
        .findOneBy({ id: bancoVinculadoId });
      if (!banco) {
        throw new NotFoundException(
          `Banco de leite #${bancoVinculadoId} não encontrado`,
        );
      }
      administrador.bancoVinculado = banco;
    }
    return toAdministradorResponseDto(
      await this.administradorRepository.save(administrador),
    );
  }

  async remove(id: number): Promise<void> {
    const administrador = await this.buscarPorId(id);
    await this.administradorRepository.remove(administrador);
  }
}
