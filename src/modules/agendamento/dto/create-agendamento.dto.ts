import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AgendamentoStatus } from '../entities/agendamento.entity';

export class CreateAgendamentoDto {
  @ApiProperty({
    description: 'Data da coleta (ISO 8601)',
    example: '2026-08-01',
  })
  @IsDateString(
    {},
    {
      message: 'A data de coleta deve ser uma data válida (formato ISO 8601)',
    },
  )
  dataColeta: string;

  @ApiProperty({ description: 'Horário da coleta', example: '10:00' })
  @IsString({ message: 'O horário deve ser um texto' })
  @IsNotEmpty({ message: 'O horário é obrigatório' })
  horario: string;

  @ApiPropertyOptional({
    description: 'Status do agendamento',
    enum: AgendamentoStatus,
    default: AgendamentoStatus.AGENDADO,
  })
  @IsOptional()
  @IsEnum(AgendamentoStatus, {
    message: 'O status deve ser um dos valores: agendado, realizado, cancelado',
  })
  status?: AgendamentoStatus;

  @ApiProperty({ description: 'ID da nutriz que agendou', example: 1 })
  @IsInt({ message: 'O ID da nutriz deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da nutriz deve ser um número positivo' })
  nutrizId: number;

  @ApiProperty({ description: 'ID da região de atendimento', example: 1 })
  @IsInt({ message: 'O ID da região de atendimento deve ser um número inteiro' })
  @IsPositive({
    message: 'O ID da região de atendimento deve ser um número positivo',
  })
  regiaoAtendimentoId: number;
}
