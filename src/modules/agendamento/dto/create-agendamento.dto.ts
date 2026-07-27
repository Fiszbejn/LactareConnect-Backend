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
  @IsDateString(
    {},
    {
      message: 'A data de coleta deve ser uma data válida (formato ISO 8601)',
    },
  )
  dataColeta: string;

  @IsString({ message: 'O horário deve ser um texto' })
  @IsNotEmpty({ message: 'O horário é obrigatório' })
  horario: string;

  @IsOptional()
  @IsEnum(AgendamentoStatus, {
    message: 'O status deve ser um dos valores: agendado, realizado, cancelado',
  })
  status?: AgendamentoStatus;

  @IsInt({ message: 'O ID da nutriz deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da nutriz deve ser um número positivo' })
  nutrizId: number;

  @IsInt({ message: 'O ID do banco de leite deve ser um número inteiro' })
  @IsPositive({
    message: 'O ID do banco de leite deve ser um número positivo',
  })
  bancoId: number;
}
