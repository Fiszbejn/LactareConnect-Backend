import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Mensagem, MensagemRemetente } from '../entities/mensagem.entity';

export class MensagemResponseDto {
  @ApiProperty({ description: 'Id da mensagem', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Remetente da mensagem',
    enum: MensagemRemetente,
  })
  remetente: MensagemRemetente;

  @ApiProperty({
    description: 'Texto da mensagem',
    example: 'Olá! Como funciona a doação de leite?',
  })
  texto: string;

  @ApiProperty({
    description: 'Data/hora da mensagem',
    example: '2026-07-28T14:01:00.000Z',
  })
  timestamp: Date;

  @ApiPropertyOptional({
    description: 'Intenção detectada pela IA, se houver',
    example: 'duvida_processo_doacao',
    nullable: true,
  })
  intencaoDetectada: string | null;

  @ApiPropertyOptional({
    description: 'Id da conversa',
    example: 1,
    nullable: true,
  })
  conversaId: number | null;
}

export function toMensagemResponseDto(mensagem: Mensagem): MensagemResponseDto {
  return {
    id: mensagem.id,
    remetente: mensagem.remetente,
    texto: mensagem.texto,
    timestamp: mensagem.timestamp,
    intencaoDetectada: mensagem.intencaoDetectada ?? null,
    conversaId: mensagem.conversa?.id ?? null,
  };
}
