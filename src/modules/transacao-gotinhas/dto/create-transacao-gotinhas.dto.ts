import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransacaoTipo } from '../entities/transacao-gotinhas.entity';

export class CreateTransacaoGotinhasDto {
  @ApiProperty({ description: 'Tipo da transação', enum: TransacaoTipo })
  @IsEnum(TransacaoTipo, {
    message:
      'O tipo deve ser um dos valores: doacao, exame, indicacao, resgate',
  })
  tipo: TransacaoTipo;

  @ApiProperty({
    description:
      'Valor em gotinhas (positivo para crédito, negativo para débito)',
    example: 100,
  })
  @IsInt({ message: 'O valor deve ser um número inteiro' })
  valor: number;

  @ApiProperty({ description: 'ID da nutriz da transação', example: 1 })
  @IsInt({ message: 'O ID da nutriz deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da nutriz deve ser um número positivo' })
  nutrizId: number;
}
