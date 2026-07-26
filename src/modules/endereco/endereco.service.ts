import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endereco } from './entities/endereco.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Endereco)
    private readonly enderecoRepository: Repository<Endereco>,
  ) {}

  create(createEnderecoDto: CreateEnderecoDto): Promise<Endereco> {
    const { nutrizId, ...dados } = createEnderecoDto;
    const endereco = this.enderecoRepository.create({
      ...dados,
      nutriz: { id: nutrizId } as Nutriz,
    });
    return this.enderecoRepository.save(endereco);
  }

  findAll(): Promise<Endereco[]> {
    return this.enderecoRepository.find({ relations: { nutriz: true } });
  }

  async findOne(id: number): Promise<Endereco> {
    const endereco = await this.enderecoRepository.findOne({
      where: { id },
      relations: { nutriz: true },
    });
    if (!endereco) {
      throw new NotFoundException(`Endereço #${id} não encontrado`);
    }
    return endereco;
  }

  async update(
    id: number,
    updateEnderecoDto: UpdateEnderecoDto,
  ): Promise<Endereco> {
    const endereco = await this.findOne(id);
    const { nutrizId, ...dados } = updateEnderecoDto;
    Object.assign(endereco, dados);
    if (nutrizId) {
      endereco.nutriz = { id: nutrizId } as Nutriz;
    }
    return this.enderecoRepository.save(endereco);
  }

  async remove(id: number): Promise<void> {
    const endereco = await this.findOne(id);
    await this.enderecoRepository.remove(endereco);
  }
}
