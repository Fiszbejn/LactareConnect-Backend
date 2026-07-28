import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Doacao } from '../entities/doacao.entity';

export class DoacaoResponseDto {
  @ApiProperty({ description: 'Id da doação', example: 1 })
  id: number;

  @ApiProperty({ description: 'Volume doado em ml', example: 300 })
  volumeMl: number;

  @ApiProperty({
    description: 'Data/hora da coleta',
    example: '2026-08-10T09:30:00.000Z',
  })
  dataColeta: Date;

  @ApiPropertyOptional({
    description: 'Id da nutriz doadora',
    example: 17,
    nullable: true,
  })
  nutrizId: number | null;

  @ApiPropertyOptional({
    description: 'Id do agendamento de origem',
    example: 4,
    nullable: true,
  })
  agendamentoId: number | null;
}

export function toDoacaoResponseDto(doacao: Doacao): DoacaoResponseDto {
  return {
    id: doacao.id,
    volumeMl: doacao.volumeMl,
    dataColeta: doacao.dataColeta,
    nutrizId: doacao.nutriz?.id ?? null,
    agendamentoId: doacao.agendamento?.id ?? null,
  };
}
