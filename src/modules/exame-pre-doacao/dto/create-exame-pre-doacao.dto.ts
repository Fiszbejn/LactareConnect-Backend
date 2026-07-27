import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExameStatus, ExameTipo } from '../entities/exame-pre-doacao.entity';

export class CreateExamePreDoacaoDto {
  @ApiProperty({ description: 'Tipo do exame', enum: ExameTipo })
  @IsEnum(ExameTipo, {
    message:
      'O tipo de exame deve ser um dos valores: carteira_pre_natal, hemograma, sorologias, htlv, sorologia_hiv, vdrl, sorologia_hepatites_b_c',
  })
  tipoExame: ExameTipo;

  @ApiPropertyOptional({
    description: 'Status do exame (só pode ser "ok" com arquivoUrl enviado)',
    enum: ExameStatus,
    default: ExameStatus.FALTANDO,
  })
  @IsOptional()
  @IsEnum(ExameStatus, {
    message: 'O status deve ser um dos valores: ok, pendente, faltando',
  })
  status?: ExameStatus;

  @ApiPropertyOptional({
    description: 'URL do arquivo do exame enviado',
    example: 'https://exemplo.com/exames/hemograma.pdf',
  })
  @IsOptional()
  @IsString({ message: 'A URL do arquivo deve ser um texto' })
  arquivoUrl?: string;

  @ApiPropertyOptional({
    description: 'Data de envio do exame (ISO 8601)',
    example: '2026-07-01T10:00:00.000Z',
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'A data de envio deve ser uma data válida (formato ISO 8601)',
    },
  )
  dataEnvio?: string;

  @ApiProperty({ description: 'ID da nutriz dona do exame', example: 1 })
  @IsInt({ message: 'O ID da nutriz deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da nutriz deve ser um número positivo' })
  nutrizId: number;
}
