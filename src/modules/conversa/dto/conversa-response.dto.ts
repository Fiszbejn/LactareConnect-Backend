import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Conversa, ConversaStatus } from '../entities/conversa.entity';

export class ConversaResponseDto {
  @ApiProperty({ description: 'Id da conversa', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Data/hora de início',
    example: '2026-07-28T14:00:00.000Z',
  })
  dataInicio: Date;

  @ApiProperty({ description: 'Status da conversa', enum: ConversaStatus })
  status: ConversaStatus;

  @ApiPropertyOptional({
    description: 'Id da nutriz',
    example: 17,
    nullable: true,
  })
  nutrizId: number | null;
}

export function toConversaResponseDto(conversa: Conversa): ConversaResponseDto {
  return {
    id: conversa.id,
    dataInicio: conversa.dataInicio,
    status: conversa.status,
    nutrizId: conversa.nutriz?.id ?? null,
  };
}
