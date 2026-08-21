import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MensagemRemetente } from '../entities/mensagem.entity';

export class CreateMensagemDto {
  @ApiProperty({
    description: 'Quem enviou a mensagem',
    enum: MensagemRemetente,
  })
  @IsEnum(MensagemRemetente, {
    message: 'O remetente deve ser um dos valores: bot, usuario',
  })
  remetente: MensagemRemetente;

  @ApiProperty({
    description: 'Texto da mensagem',
    example: 'Como faço para doar leite?',
  })
  @IsString({ message: 'O texto deve ser um texto' })
  @IsNotEmpty({ message: 'O texto é obrigatório' })
  texto: string;

  @ApiPropertyOptional({
    description: 'Intenção detectada pelo chatbot',
    example: 'duvida_doacao',
  })
  @IsOptional()
  @IsString({ message: 'A intenção detectada deve ser um texto' })
  intencaoDetectada?: string;

  @ApiProperty({ description: 'ID da conversa', example: 1 })
  @IsInt({ message: 'O ID da conversa deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da conversa deve ser um número positivo' })
  conversaId: number;
}
