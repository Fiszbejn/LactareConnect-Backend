import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Nutriz } from './entities/nutriz.entity';
import { PreferenciasUsuario } from '../preferencias-usuario/entities/preferencias-usuario.entity';
import { CreateNutrizDto } from './dto/create-nutriz.dto';
import { UpdateNutrizDto } from './dto/update-nutriz.dto';
import { AuthUser } from '../auth/types/auth-user.type';
import { lancarConflitoSeViolarChaveEstrangeira } from '../../common/oracle-fk-constraint.util';
import {
  NutrizResponseDto,
  toNutrizResponseDto,
} from './dto/nutriz-response.dto';

@Injectable()
export class NutrizService {
  constructor(
    @InjectRepository(Nutriz)
    private readonly nutrizRepository: Repository<Nutriz>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(createNutrizDto: CreateNutrizDto): Promise<NutrizResponseDto> {
    const { senha, ...dados } = createNutrizDto;
    const senhaHash = await bcrypt.hash(senha, 10);

    return this.dataSource.transaction(async (manager) => {
      const existente = await manager.findOne(Nutriz, {
        where: [{ cpf: dados.cpf }, { email: dados.email }],
      });
      if (existente) {
        throw new ConflictException(
          existente.cpf === dados.cpf
            ? `Já existe uma nutriz cadastrada com o CPF ${dados.cpf}`
            : `Já existe uma nutriz cadastrada com o email ${dados.email}`,
        );
      }

      const nutriz = manager.create(Nutriz, { ...dados, senhaHash });
      await manager.save(nutriz);

      const preferencias = manager.create(PreferenciasUsuario, {
        nutriz: { id: nutriz.id } as Nutriz,
      });
      await manager.save(preferencias);

      return toNutrizResponseDto(nutriz);
    });
  }

  async findAll(): Promise<NutrizResponseDto[]> {
    const nutrizes = await this.nutrizRepository.find({
      relations: { endereco: true, preferencias: true },
    });
    return nutrizes.map(toNutrizResponseDto);
  }

  private async buscarPorId(id: number, user: AuthUser): Promise<Nutriz> {
    const nutriz = await this.nutrizRepository.findOne({
      where: { id },
      relations: { endereco: true, preferencias: true },
    });
    if (!nutriz) {
      throw new NotFoundException(`Nutriz #${id} não encontrada`);
    }
    if (user.tipo === 'nutriz' && user.id !== nutriz.id) {
      throw new ForbiddenException(
        'Você só pode acessar o próprio perfil de nutriz.',
      );
    }
    return nutriz;
  }

  async findOne(id: number, user: AuthUser): Promise<NutrizResponseDto> {
    return toNutrizResponseDto(await this.buscarPorId(id, user));
  }

  async update(
    id: number,
    updateNutrizDto: UpdateNutrizDto,
    user: AuthUser,
  ): Promise<NutrizResponseDto> {
    const nutriz = await this.buscarPorId(id, user);
    const { senha, ...dados } = updateNutrizDto;
    Object.assign(nutriz, dados);
    if (senha) {
      nutriz.senhaHash = await bcrypt.hash(senha, 10);
    }
    return toNutrizResponseDto(await this.nutrizRepository.save(nutriz));
  }

  async remove(id: number, user: AuthUser): Promise<void> {
    const nutriz = await this.buscarPorId(id, user);
    try {
      await this.nutrizRepository.remove(nutriz);
    } catch (error) {
      lancarConflitoSeViolarChaveEstrangeira(
        error,
        `Não é possível remover a nutriz #${id} pois existem registros vinculados a ela (exames, agendamentos, doações, etc.).`,
      );
    }
  }
}
