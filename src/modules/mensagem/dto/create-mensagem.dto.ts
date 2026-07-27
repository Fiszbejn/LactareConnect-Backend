import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { MensagemRemetente } from '../entities/mensagem.entity';

export class CreateMensagemDto {
  @IsEnum(MensagemRemetente, {
    message: 'O remetente deve ser um dos valores: bot, usuario',
  })
  remetente: MensagemRemetente;

  @IsString({ message: 'O texto deve ser um texto' })
  @IsNotEmpty({ message: 'O texto é obrigatório' })
  texto: string;

  @IsOptional()
  @IsString({ message: 'A intenção detectada deve ser um texto' })
  intencaoDetectada?: string;

  @IsInt({ message: 'O ID da conversa deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da conversa deve ser um número positivo' })
  conversaId: number;
}
