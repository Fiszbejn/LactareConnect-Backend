import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Agendamento, AgendamentoStatus } from '../entities/agendamento.entity';

export class AgendamentoResponseDto {
  @ApiProperty({ description: 'Id do agendamento', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Data da coleta (ISO 8601)',
    example: '2026-08-10',
  })
  dataColeta: Date;

  @ApiProperty({ description: 'Horário da coleta', example: '09:30' })
  horario: string;

  @ApiProperty({
    description: 'Status do agendamento',
    enum: AgendamentoStatus,
  })
  status: AgendamentoStatus;

  @ApiPropertyOptional({
    description: 'Id da nutriz',
    example: 17,
    nullable: true,
  })
  nutrizId: number | null;

  @ApiPropertyOptional({
    description: 'Id da região de atendimento',
    example: 2,
    nullable: true,
  })
  regiaoAtendimentoId: number | null;

  @ApiPropertyOptional({
    description:
      'Id da doação gerada a partir deste agendamento, se já registrada',
    example: 5,
    nullable: true,
  })
  doacaoId: number | null;
}

export function toAgendamentoResponseDto(
  agendamento: Agendamento,
): AgendamentoResponseDto {
  return {
    id: agendamento.id,
    dataColeta: agendamento.dataColeta,
    horario: agendamento.horario,
    status: agendamento.status,
    nutrizId: agendamento.nutriz?.id ?? null,
    regiaoAtendimentoId: agendamento.regiaoAtendimento?.id ?? null,
    doacaoId: agendamento.doacao?.id ?? null,
  };
}
