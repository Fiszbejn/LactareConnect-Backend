import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Endereco } from './entities/endereco.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { AuthUser } from '../auth/types/auth-user.type';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Endereco)
    private readonly enderecoRepository: Repository<Endereco>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createEnderecoDto: CreateEnderecoDto,
    user: AuthUser,
  ): Promise<Endereco> {
    const { nutrizId, ...dados } = createEnderecoDto;

    if (user.tipo === 'nutriz' && user.id !== nutrizId) {
      throw new ForbiddenException(
        'Você só pode cadastrar um endereço para você mesma.',
      );
    }

    const nutriz = await this.dataSource
      .getRepository(Nutriz)
      .findOneBy({ id: nutrizId });
    if (!nutriz) {
      throw new NotFoundException(`Nutriz #${nutrizId} não encontrada`);
    }
    const existente = await this.enderecoRepository.findOne({
      where: { nutriz: { id: nutrizId } },
    });
    if (existente) {
      throw new ConflictException(
        `A nutriz #${nutrizId} já possui um endereço cadastrado.`,
      );
    }

    const endereco = this.enderecoRepository.create({ ...dados, nutriz });
    return this.enderecoRepository.save(endereco);
  }

  findAll(user: AuthUser): Promise<Endereco[]> {
    const where = user.tipo === 'nutriz' ? { nutriz: { id: user.id } } : {};
    return this.enderecoRepository.find({ where, relations: { nutriz: true } });
  }

  async findOne(id: number, user: AuthUser): Promise<Endereco> {
    const endereco = await this.enderecoRepository.findOne({
      where: { id },
      relations: { nutriz: true },
    });
    if (!endereco) {
      throw new NotFoundException(`Endereço #${id} não encontrado`);
    }
    if (user.tipo === 'nutriz' && user.id !== endereco.nutriz.id) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este endereço.',
      );
    }
    return endereco;
  }

  async update(
    id: number,
    updateEnderecoDto: UpdateEnderecoDto,
    user: AuthUser,
  ): Promise<Endereco> {
    const endereco = await this.findOne(id, user);
    const { nutrizId, ...dados } = updateEnderecoDto;
    Object.assign(endereco, dados);

    if (nutrizId) {
      if (user.tipo === 'nutriz' && user.id !== nutrizId) {
        throw new ForbiddenException(
          'Você não pode transferir este endereço para outra nutriz.',
        );
      }
      const nutriz = await this.dataSource
        .getRepository(Nutriz)
        .findOneBy({ id: nutrizId });
      if (!nutriz) {
        throw new NotFoundException(`Nutriz #${nutrizId} não encontrada`);
      }
      const existente = await this.enderecoRepository.findOne({
        where: { nutriz: { id: nutrizId } },
      });
      if (existente && existente.id !== id) {
        throw new ConflictException(
          `A nutriz #${nutrizId} já possui um endereço cadastrado.`,
        );
      }
      endereco.nutriz = nutriz;
    }
    return this.enderecoRepository.save(endereco);
  }

  async remove(id: number, user: AuthUser): Promise<void> {
    const endereco = await this.findOne(id, user);
    await this.enderecoRepository.remove(endereco);
  }
}
