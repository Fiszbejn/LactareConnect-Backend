import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ExameStatus, ExameTipo } from '../entities/exame-pre-doacao.entity';

export class CreateExamePreDoacaoDto {
  @IsEnum(ExameTipo)
  tipoExame: ExameTipo;

  @IsOptional()
  @IsEnum(ExameStatus)
  status?: ExameStatus;

  @IsOptional()
  @IsString()
  arquivoUrl?: string;

  @IsOptional()
  @IsDateString()
  dataEnvio?: string;

  @IsInt()
  @IsPositive()
  nutrizId: number;
}
