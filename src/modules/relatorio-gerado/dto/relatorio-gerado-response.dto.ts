import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  RelatorioGerado,
  RelatorioFormato,
} from '../entities/relatorio-gerado.entity';

export class RelatorioGeradoResponseDto {
  @ApiProperty({ description: 'Id do relatório', example: 1 })
  id: number;

  @ApiProperty({ description: 'Início do período', example: '2026-07-01' })
  periodoInicio: Date;

  @ApiProperty({ description: 'Fim do período', example: '2026-07-31' })
  periodoFim: Date;

  @ApiProperty({
    description: 'Seções incluídas no relatório',
    example: 'doacoes,agendamentos,resgates',
  })
  secoesIncluidas: string;

  @ApiProperty({ description: 'Formato do relatório', enum: RelatorioFormato })
  formato: RelatorioFormato;

  @ApiPropertyOptional({
    description: 'URL do arquivo gerado, se disponível',
    example: 'https://storage.lactareconnect.com/relatorios/1.pdf',
    nullable: true,
  })
  arquivoUrl: string | null;

  @ApiProperty({
    description: 'Data/hora de geração',
    example: '2026-08-01T08:00:00.000Z',
  })
  dataGeracao: Date;

  @ApiPropertyOptional({
    description: 'Id do administrador que gerou o relatório',
    example: 1,
    nullable: true,
  })
  administradorId: number | null;
}

export function toRelatorioGeradoResponseDto(
  relatorio: RelatorioGerado,
): RelatorioGeradoResponseDto {
  return {
    id: relatorio.id,
    periodoInicio: relatorio.periodoInicio,
    periodoFim: relatorio.periodoFim,
    secoesIncluidas: relatorio.secoesIncluidas,
    formato: relatorio.formato,
    arquivoUrl: relatorio.arquivoUrl ?? null,
    dataGeracao: relatorio.dataGeracao,
    administradorId: relatorio.administrador?.id ?? null,
  };
}
