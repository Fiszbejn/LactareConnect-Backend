import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { Conversa } from '../conversa/entities/conversa.entity';
import { CreateMensagemDto } from './dto/create-mensagem.dto';

@Injectable()
export class MensagemService {
  constructor(
    @InjectRepository(Mensagem)
    private readonly mensagemRepository: Repository<Mensagem>,
  ) {}

  create(createMensagemDto: CreateMensagemDto): Promise<Mensagem> {
    const { conversaId, ...dados } = createMensagemDto;
    const mensagem = this.mensagemRepository.create({
      ...dados,
      conversa: { id: conversaId } as Conversa,
    });
    return this.mensagemRepository.save(mensagem);
  }

  findAll(): Promise<Mensagem[]> {
    return this.mensagemRepository.find({ relations: { conversa: true } });
  }

  findByConversa(conversaId: number): Promise<Mensagem[]> {
    return this.mensagemRepository.find({
      where: { conversa: { id: conversaId } },
      order: { timestamp: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Mensagem> {
    const mensagem = await this.mensagemRepository.findOne({
      where: { id },
      relations: { conversa: true },
    });
    if (!mensagem) {
      throw new NotFoundException(`Mensagem #${id} não encontrada`);
    }
    return mensagem;
  }
}
