import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { AgendamentoStatus } from '../entities/agendamento.entity';

export class CreateAgendamentoDto {
  @IsDateString()
  dataColeta: string;

  @IsString()
  @IsNotEmpty()
  horario: string;

  @IsOptional()
  @IsEnum(AgendamentoStatus)
  status?: AgendamentoStatus;

  @IsInt()
  @IsPositive()
  nutrizId: number;

  @IsInt()
  @IsPositive()
  bancoId: number;
}
