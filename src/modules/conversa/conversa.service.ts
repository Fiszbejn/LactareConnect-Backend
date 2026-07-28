import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Conversa, ConversaStatus } from './entities/conversa.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { CreateConversaDto } from './dto/create-conversa.dto';
import {
  ConversaResponseDto,
  toConversaResponseDto,
} from './dto/conversa-response.dto';

@Injectable()
export class ConversaService {
  constructor(
    @InjectRepository(Conversa)
    private readonly conversaRepository: Repository<Conversa>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createConversaDto: CreateConversaDto,
  ): Promise<ConversaResponseDto> {
    const { nutrizId, ...dados } = createConversaDto;

    const nutriz = await this.dataSource
      .getRepository(Nutriz)
      .findOneBy({ id: nutrizId });
    if (!nutriz) {
      throw new NotFoundException(`Nutriz #${nutrizId} não encontrada`);
    }

    const conversaAberta = await this.conversaRepository.findOne({
      where: { nutriz: { id: nutrizId }, status: ConversaStatus.ABERTA },
    });
    if (conversaAberta) {
      conversaAberta.status = ConversaStatus.ENCERRADA;
      await this.conversaRepository.save(conversaAberta);
    }

    const conversa = this.conversaRepository.create({ ...dados, nutriz });
    return toConversaResponseDto(await this.conversaRepository.save(conversa));
  }

  async findAll(): Promise<ConversaResponseDto[]> {
    const conversas = await this.conversaRepository.find({
      relations: { nutriz: true },
    });
    return conversas.map(toConversaResponseDto);
  }

  async findOne(id: number): Promise<ConversaResponseDto> {
    const conversa = await this.conversaRepository.findOne({
      where: { id },
      relations: { nutriz: true, mensagens: true },
    });
    if (!conversa) {
      throw new NotFoundException(`Conversa #${id} não encontrada`);
    }
    return toConversaResponseDto(conversa);
  }
}
