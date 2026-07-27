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
  @IsDateString(
    {},
    {
      message: 'O período inicial deve ser uma data válida (formato ISO 8601)',
    },
  )
  periodoInicio: string;

  @IsDateString(
    {},
    {
      message: 'O período final deve ser uma data válida (formato ISO 8601)',
    },
  )
  periodoFim: string;

  @IsString({ message: 'As seções incluídas devem ser um texto' })
  @IsNotEmpty({ message: 'As seções incluídas são obrigatórias' })
  secoesIncluidas: string;

  @IsEnum(RelatorioFormato, {
    message: 'O formato deve ser um dos valores: pdf_completo, pdf_resumo, csv',
  })
  formato: RelatorioFormato;

  @IsOptional()
  @IsString({ message: 'A URL do arquivo deve ser um texto' })
  arquivoUrl?: string;

  @IsInt({ message: 'O ID do administrador deve ser um número inteiro' })
  @IsPositive({
    message: 'O ID do administrador deve ser um número positivo',
  })
  administradorId: number;
}
