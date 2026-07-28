import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  TransacaoGotinhas,
  TransacaoTipo,
} from '../entities/transacao-gotinhas.entity';

export class TransacaoGotinhasResponseDto {
  @ApiProperty({ description: 'Id da transação', example: 1 })
  id: number;

  @ApiProperty({ description: 'Tipo da transação', enum: TransacaoTipo })
  tipo: TransacaoTipo;

  @ApiProperty({
    description: 'Valor da transação em gotinhas (negativo em resgates)',
    example: 100,
  })
  valor: number;

  @ApiProperty({
    description: 'Data/hora da transação',
    example: '2026-07-28T09:00:00.000Z',
  })
  data: Date;

  @ApiPropertyOptional({
    description: 'Id da nutriz',
    example: 17,
    nullable: true,
  })
  nutrizId: number | null;
}

export function toTransacaoGotinhasResponseDto(
  transacao: TransacaoGotinhas,
): TransacaoGotinhasResponseDto {
  return {
    id: transacao.id,
    tipo: transacao.tipo,
    valor: transacao.valor,
    data: transacao.data,
    nutrizId: transacao.nutriz?.id ?? null,
  };
}
