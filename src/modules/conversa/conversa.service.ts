import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversa } from './entities/conversa.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { CreateConversaDto } from './dto/create-conversa.dto';

@Injectable()
export class ConversaService {
  constructor(
    @InjectRepository(Conversa)
    private readonly conversaRepository: Repository<Conversa>,
  ) {}

  create(createConversaDto: CreateConversaDto): Promise<Conversa> {
    const { nutrizId, ...dados } = createConversaDto;
    const conversa = this.conversaRepository.create({
      ...dados,
      nutriz: { id: nutrizId } as Nutriz,
    });
    return this.conversaRepository.save(conversa);
  }

  findAll(): Promise<Conversa[]> {
    return this.conversaRepository.find({ relations: { nutriz: true } });
  }

  async findOne(id: number): Promise<Conversa> {
    const conversa = await this.conversaRepository.findOne({
      where: { id },
      relations: { nutriz: true, mensagens: true },
    });
    if (!conversa) {
      throw new NotFoundException(`Conversa #${id} não encontrada`);
    }
    return conversa;
  }
}
