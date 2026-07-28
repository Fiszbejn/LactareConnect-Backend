import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { Conversa, ConversaStatus } from '../conversa/entities/conversa.entity';
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import {
  MensagemResponseDto,
  toMensagemResponseDto,
} from './dto/mensagem-response.dto';

@Injectable()
export class MensagemService {
  constructor(
    @InjectRepository(Mensagem)
    private readonly mensagemRepository: Repository<Mensagem>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createMensagemDto: CreateMensagemDto,
  ): Promise<MensagemResponseDto> {
    const { conversaId, ...dados } = createMensagemDto;

    const conversa = await this.dataSource
      .getRepository(Conversa)
      .findOneBy({ id: conversaId });
    if (!conversa) {
      throw new NotFoundException(`Conversa #${conversaId} não encontrada`);
    }
    if (conversa.status === ConversaStatus.ENCERRADA) {
      throw new BadRequestException(
        'Não é possível adicionar mensagens a uma conversa encerrada.',
      );
    }

    const mensagem = this.mensagemRepository.create({ ...dados, conversa });
    return toMensagemResponseDto(await this.mensagemRepository.save(mensagem));
  }

  async findAll(): Promise<MensagemResponseDto[]> {
    const mensagens = await this.mensagemRepository.find({
      relations: { conversa: true },
    });
    return mensagens.map(toMensagemResponseDto);
  }

  async findByConversa(conversaId: number): Promise<MensagemResponseDto[]> {
    const mensagens = await this.mensagemRepository.find({
      where: { conversa: { id: conversaId } },
      relations: { conversa: true },
      order: { timestamp: 'ASC' },
    });
    return mensagens.map(toMensagemResponseDto);
  }

  async findOne(id: number): Promise<MensagemResponseDto> {
    const mensagem = await this.mensagemRepository.findOne({
      where: { id },
      relations: { conversa: true },
    });
    if (!mensagem) {
      throw new NotFoundException(`Mensagem #${id} não encontrada`);
    }
    return toMensagemResponseDto(mensagem);
  }
}
