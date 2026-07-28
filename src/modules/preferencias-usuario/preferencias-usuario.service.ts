import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PreferenciasUsuario } from './entities/preferencias-usuario.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { CreatePreferenciasUsuarioDto } from './dto/create-preferencias-usuario.dto';
import { UpdatePreferenciasUsuarioDto } from './dto/update-preferencias-usuario.dto';
import { AuthUser } from '../auth/types/auth-user.type';
import {
  PreferenciasUsuarioResponseDto,
  toPreferenciasUsuarioResponseDto,
} from './dto/preferencias-usuario-response.dto';

@Injectable()
export class PreferenciasUsuarioService {
  constructor(
    @InjectRepository(PreferenciasUsuario)
    private readonly preferenciasRepository: Repository<PreferenciasUsuario>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createPreferenciasUsuarioDto: CreatePreferenciasUsuarioDto,
  ): Promise<PreferenciasUsuarioResponseDto> {
    const { nutrizId, ...dados } = createPreferenciasUsuarioDto;

    const nutriz = await this.dataSource
      .getRepository(Nutriz)
      .findOneBy({ id: nutrizId });
    if (!nutriz) {
      throw new NotFoundException(`Nutriz #${nutrizId} não encontrada`);
    }
    const existente = await this.preferenciasRepository.findOne({
      where: { nutriz: { id: nutrizId } },
    });
    if (existente) {
      throw new ConflictException(
        `A nutriz #${nutrizId} já possui preferências cadastradas.`,
      );
    }

    const preferencias = this.preferenciasRepository.create({
      ...dados,
      nutriz,
    });
    return toPreferenciasUsuarioResponseDto(
      await this.preferenciasRepository.save(preferencias),
    );
  }

  async findAll(user: AuthUser): Promise<PreferenciasUsuarioResponseDto[]> {
    const where = user.tipo === 'nutriz' ? { nutriz: { id: user.id } } : {};
    const preferencias = await this.preferenciasRepository.find({
      where,
      relations: { nutriz: true },
    });
    return preferencias.map(toPreferenciasUsuarioResponseDto);
  }

  private async buscarPorId(
    id: number,
    user: AuthUser,
  ): Promise<PreferenciasUsuario> {
    const preferencias = await this.preferenciasRepository.findOne({
      where: { id },
      relations: { nutriz: true },
    });
    if (!preferencias) {
      throw new NotFoundException(`Preferências #${id} não encontradas`);
    }
    if (user.tipo === 'nutriz' && user.id !== preferencias.nutriz.id) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar estas preferências.',
      );
    }
    return preferencias;
  }

  async findOne(
    id: number,
    user: AuthUser,
  ): Promise<PreferenciasUsuarioResponseDto> {
    return toPreferenciasUsuarioResponseDto(await this.buscarPorId(id, user));
  }

  async update(
    id: number,
    updatePreferenciasUsuarioDto: UpdatePreferenciasUsuarioDto,
    user: AuthUser,
  ): Promise<PreferenciasUsuarioResponseDto> {
    const preferencias = await this.buscarPorId(id, user);
    const { nutrizId, ...dados } = updatePreferenciasUsuarioDto;
    Object.assign(preferencias, dados);

    if (nutrizId) {
      if (user.tipo === 'nutriz' && user.id !== nutrizId) {
        throw new ForbiddenException(
          'Você não pode transferir estas preferências para outra nutriz.',
        );
      }
      const nutriz = await this.dataSource
        .getRepository(Nutriz)
        .findOneBy({ id: nutrizId });
      if (!nutriz) {
        throw new NotFoundException(`Nutriz #${nutrizId} não encontrada`);
      }
      const existente = await this.preferenciasRepository.findOne({
        where: { nutriz: { id: nutrizId } },
      });
      if (existente && existente.id !== id) {
        throw new ConflictException(
          `A nutriz #${nutrizId} já possui preferências cadastradas.`,
        );
      }
      preferencias.nutriz = nutriz;
    }
    return toPreferenciasUsuarioResponseDto(
      await this.preferenciasRepository.save(preferencias),
    );
  }
}
