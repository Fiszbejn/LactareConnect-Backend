import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BancoLeiteLactare } from './entities/banco-leite.entity';
import { CreateBancoLeiteDto } from './dto/create-banco-leite.dto';
import { UpdateBancoLeiteDto } from './dto/update-banco-leite.dto';

@Injectable()
export class BancoLeiteService {
  constructor(
    @InjectRepository(BancoLeiteLactare)
    private readonly bancoLeiteRepository: Repository<BancoLeiteLactare>,
  ) {}

  create(createBancoLeiteDto: CreateBancoLeiteDto): Promise<BancoLeiteLactare> {
    const banco = this.bancoLeiteRepository.create(createBancoLeiteDto);
    return this.bancoLeiteRepository.save(banco);
  }

  findAll(): Promise<BancoLeiteLactare[]> {
    return this.bancoLeiteRepository.find();
  }

  async findOne(id: number): Promise<BancoLeiteLactare> {
    const banco = await this.bancoLeiteRepository.findOne({ where: { id } });
    if (!banco) {
      throw new NotFoundException(`Banco de leite #${id} não encontrado`);
    }
    return banco;
  }

  async update(
    id: number,
    updateBancoLeiteDto: UpdateBancoLeiteDto,
  ): Promise<BancoLeiteLactare> {
    const banco = await this.findOne(id);
    Object.assign(banco, updateBancoLeiteDto);
    return this.bancoLeiteRepository.save(banco);
  }

  async remove(id: number): Promise<void> {
    const banco = await this.findOne(id);
    await this.bancoLeiteRepository.remove(banco);
  }
}
