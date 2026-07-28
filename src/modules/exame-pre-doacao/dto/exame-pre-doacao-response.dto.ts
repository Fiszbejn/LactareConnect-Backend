import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ExamePreDoacao,
  ExameStatus,
  ExameTipo,
} from '../entities/exame-pre-doacao.entity';

export class ExamePreDoacaoResponseDto {
  @ApiProperty({ description: 'Id do exame', example: 1 })
  id: number;

  @ApiProperty({ description: 'Tipo do exame', enum: ExameTipo })
  tipoExame: ExameTipo;

  @ApiProperty({ description: 'Status do exame', enum: ExameStatus })
  status: ExameStatus;

  @ApiPropertyOptional({
    description: 'URL do arquivo enviado',
    example: 'https://storage.lactareconnect.com/exames/1.pdf',
    nullable: true,
  })
  arquivoUrl: string | null;

  @ApiPropertyOptional({
    description: 'Data/hora de envio do arquivo',
    example: '2026-07-20T10:00:00.000Z',
    nullable: true,
  })
  dataEnvio: Date | null;

  @ApiPropertyOptional({
    description: 'Id da nutriz',
    example: 17,
    nullable: true,
  })
  nutrizId: number | null;
}

export function toExamePreDoacaoResponseDto(
  exame: ExamePreDoacao,
): ExamePreDoacaoResponseDto {
  return {
    id: exame.id,
    tipoExame: exame.tipoExame,
    status: exame.status,
    arquivoUrl: exame.arquivoUrl ?? null,
    dataEnvio: exame.dataEnvio ?? null,
    nutrizId: exame.nutriz?.id ?? null,
  };
}
