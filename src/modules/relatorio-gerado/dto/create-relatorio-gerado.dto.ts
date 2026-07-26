import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { RelatorioFormato } from '../entities/relatorio-gerado.entity';

export class CreateRelatorioGeradoDto {
  @IsDateString()
  periodoInicio: string;

  @IsDateString()
  periodoFim: string;

  @IsString()
  @IsNotEmpty()
  secoesIncluidas: string;

  @IsEnum(RelatorioFormato)
  formato: RelatorioFormato;

  @IsOptional()
  @IsString()
  arquivoUrl?: string;

  @IsInt()
  @IsPositive()
  administradorId: number;
}
