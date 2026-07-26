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
  @IsEnum(MensagemRemetente)
  remetente: MensagemRemetente;

  @IsString()
  @IsNotEmpty()
  texto: string;

  @IsOptional()
  @IsString()
  intencaoDetectada?: string;

  @IsInt()
  @IsPositive()
  conversaId: number;
}
