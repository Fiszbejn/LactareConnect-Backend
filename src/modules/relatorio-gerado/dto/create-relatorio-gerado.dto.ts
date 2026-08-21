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
import { RelatorioFormato } from '../entities/relatorio-gerado.entity';

export class CreateRelatorioGeradoDto {
  @ApiProperty({
    description: 'Data de início do período (ISO 8601)',
    example: '2026-06-01',
  })
  @IsDateString(
    {},
    {
      message: 'O período inicial deve ser uma data válida (formato ISO 8601)',
    },
  )
  periodoInicio: string;

  @ApiProperty({
    description:
      'Data de fim do período (ISO 8601, deve ser >= período inicial)',
    example: '2026-07-01',
  })
  @IsDateString(
    {},
    {
      message: 'O período final deve ser uma data válida (formato ISO 8601)',
    },
  )
  periodoFim: string;

  @ApiProperty({
    description: 'Seções incluídas no relatório',
    example: 'doacoes,resgates',
  })
  @IsString({ message: 'As seções incluídas devem ser um texto' })
  @IsNotEmpty({ message: 'As seções incluídas são obrigatórias' })
  secoesIncluidas: string;

  @ApiProperty({
    description: 'Formato do arquivo gerado',
    enum: RelatorioFormato,
  })
  @IsEnum(RelatorioFormato, {
    message: 'O formato deve ser um dos valores: pdf_completo, pdf_resumo, csv',
  })
  formato: RelatorioFormato;

  @ApiPropertyOptional({
    description: 'URL do arquivo gerado',
    example: 'https://exemplo.com/relatorios/relatorio.pdf',
  })
  @IsOptional()
  @IsString({ message: 'A URL do arquivo deve ser um texto' })
  arquivoUrl?: string;

  @ApiProperty({
    description: 'ID do administrador que gerou o relatório',
    example: 1,
  })
  @IsInt({ message: 'O ID do administrador deve ser um número inteiro' })
  @IsPositive({
    message: 'O ID do administrador deve ser um número positivo',
  })
  administradorId: number;
}
