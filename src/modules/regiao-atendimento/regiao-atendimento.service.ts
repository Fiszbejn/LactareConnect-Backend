import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegiaoAtendimento } from './entities/regiao-atendimento.entity';
import { CreateRegiaoAtendimentoDto } from './dto/create-regiao-atendimento.dto';
import { UpdateRegiaoAtendimentoDto } from './dto/update-regiao-atendimento.dto';
import { lancarConflitoSeViolarChaveEstrangeira } from '../../common/oracle-fk-constraint.util';
import {
  RegiaoAtendimentoResponseDto,
  toRegiaoAtendimentoResponseDto,
} from './dto/regiao-atendimento-response.dto';

@Injectable()
export class RegiaoAtendimentoService {
  constructor(
    @InjectRepository(RegiaoAtendimento)
    private readonly regiaoAtendimentoRepository: Repository<RegiaoAtendimento>,
  ) {}

  private async buscarPorId(id: number): Promise<RegiaoAtendimento> {
    const regiao = await this.regiaoAtendimentoRepository.findOne({
      where: { id },
    });
    if (!regiao) {
      throw new NotFoundException(`Região de atendimento #${id} não encontrada`);
    }
    return regiao;
  }

  async create(
    createRegiaoAtendimentoDto: CreateRegiaoAtendimentoDto,
  ): Promise<RegiaoAtendimentoResponseDto> {
    const regiao = this.regiaoAtendimentoRepository.create(
      createRegiaoAtendimentoDto,
    );
    return toRegiaoAtendimentoResponseDto(
      await this.regiaoAtendimentoRepository.save(regiao),
    );
  }

  async findAll(): Promise<RegiaoAtendimentoResponseDto[]> {
    const regioes = await this.regiaoAtendimentoRepository.find();
    return regioes.map(toRegiaoAtendimentoResponseDto);
  }

  async findOne(id: number): Promise<RegiaoAtendimentoResponseDto> {
    return toRegiaoAtendimentoResponseDto(await this.buscarPorId(id));
  }

  async update(
    id: number,
    updateRegiaoAtendimentoDto: UpdateRegiaoAtendimentoDto,
  ): Promise<RegiaoAtendimentoResponseDto> {
    const regiao = await this.buscarPorId(id);
    Object.assign(regiao, updateRegiaoAtendimentoDto);
    return toRegiaoAtendimentoResponseDto(
      await this.regiaoAtendimentoRepository.save(regiao),
    );
  }

  async remove(id: number): Promise<void> {
    const regiao = await this.buscarPorId(id);
    try {
      await this.regiaoAtendimentoRepository.remove(regiao);
    } catch (error) {
      lancarConflitoSeViolarChaveEstrangeira(
        error,
        `Não é possível remover a região de atendimento #${id} pois existem agendamentos ou administradores vinculados a ela.`,
      );
    }
  }
}
