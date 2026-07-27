import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { TransacaoTipo } from '../entities/transacao-gotinhas.entity';

export class CreateTransacaoGotinhasDto {
  @IsEnum(TransacaoTipo, {
    message:
      'O tipo deve ser um dos valores: doacao, exame, indicacao, resgate',
  })
  tipo: TransacaoTipo;

  @IsInt({ message: 'O valor deve ser um número inteiro' })
  valor: number;

  @IsInt({ message: 'O ID da nutriz deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da nutriz deve ser um número positivo' })
  nutrizId: number;
}
