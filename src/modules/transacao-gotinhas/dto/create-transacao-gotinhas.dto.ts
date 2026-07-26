import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { TransacaoTipo } from '../entities/transacao-gotinhas.entity';

export class CreateTransacaoGotinhasDto {
  @IsEnum(TransacaoTipo)
  tipo: TransacaoTipo;

  @IsInt()
  valor: number;

  @IsInt()
  @IsPositive()
  nutrizId: number;
}
