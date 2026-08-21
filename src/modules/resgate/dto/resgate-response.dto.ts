import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Resgate, ResgateStatus } from '../entities/resgate.entity';

export class ResgateResponseDto {
  @ApiProperty({ description: 'Id do resgate', example: 1 })
  id: number;

  @ApiProperty({ description: 'Status do resgate', enum: ResgateStatus })
  status: ResgateStatus;

  @ApiPropertyOptional({
    description: 'Endereço de entrega, se aplicável',
    example: 'Avenida Paulista, 1000 - São Paulo/SP',
    nullable: true,
  })
  enderecoEntrega: string | null;

  @ApiProperty({
    description: 'Data/hora do resgate',
    example: '2026-07-28T15:00:00.000Z',
  })
  data: Date;

  @ApiPropertyOptional({
    description: 'Id da nutriz',
    example: 17,
    nullable: true,
  })
  nutrizId: number | null;

  @ApiPropertyOptional({
    description: 'Id da recompensa resgatada',
    example: 2,
    nullable: true,
  })
  recompensaId: number | null;
}

export function toResgateResponseDto(resgate: Resgate): ResgateResponseDto {
  return {
    id: resgate.id,
    status: resgate.status,
    enderecoEntrega: resgate.enderecoEntrega ?? null,
    data: resgate.data,
    nutrizId: resgate.nutriz?.id ?? null,
    recompensaId: resgate.recompensa?.id ?? null,
  };
}
