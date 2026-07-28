import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BancoLeiteLactare } from './entities/banco-leite.entity';
import { CreateBancoLeiteDto } from './dto/create-banco-leite.dto';
import { UpdateBancoLeiteDto } from './dto/update-banco-leite.dto';
import { lancarConflitoSeViolarChaveEstrangeira } from '../../common/oracle-fk-constraint.util';
import {
  BancoLeiteResponseDto,
  toBancoLeiteResponseDto,
} from './dto/banco-leite-response.dto';

@Injectable()
export class BancoLeiteService {
  constructor(
    @InjectRepository(BancoLeiteLactare)
    private readonly bancoLeiteRepository: Repository<BancoLeiteLactare>,
  ) {}

  private async buscarPorId(id: number): Promise<BancoLeiteLactare> {
    const banco = await this.bancoLeiteRepository.findOne({ where: { id } });
    if (!banco) {
      throw new NotFoundException(`Banco de leite #${id} não encontrado`);
    }
    return banco;
  }

  async create(
    createBancoLeiteDto: CreateBancoLeiteDto,
  ): Promise<BancoLeiteResponseDto> {
    const banco = this.bancoLeiteRepository.create(createBancoLeiteDto);
    return toBancoLeiteResponseDto(await this.bancoLeiteRepository.save(banco));
  }

  async findAll(): Promise<BancoLeiteResponseDto[]> {
    const bancos = await this.bancoLeiteRepository.find();
    return bancos.map(toBancoLeiteResponseDto);
  }

  async findOne(id: number): Promise<BancoLeiteResponseDto> {
    return toBancoLeiteResponseDto(await this.buscarPorId(id));
  }

  async update(
    id: number,
    updateBancoLeiteDto: UpdateBancoLeiteDto,
  ): Promise<BancoLeiteResponseDto> {
    const banco = await this.buscarPorId(id);
    Object.assign(banco, updateBancoLeiteDto);
    return toBancoLeiteResponseDto(await this.bancoLeiteRepository.save(banco));
  }

  async remove(id: number): Promise<void> {
    const banco = await this.buscarPorId(id);
    try {
      await this.bancoLeiteRepository.remove(banco);
    } catch (error) {
      lancarConflitoSeViolarChaveEstrangeira(
        error,
        `Não é possível remover o banco de leite #${id} pois existem agendamentos ou administradores vinculados a ele.`,
      );
    }
  }
}
