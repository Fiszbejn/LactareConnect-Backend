import { IsBoolean, IsInt, IsPositive } from 'class-validator';

export class CreateFeedbackFaqDto {
  @IsBoolean({ message: 'Útil deve ser verdadeiro ou falso' })
  util: boolean;

  @IsInt({ message: 'O ID da pergunta deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da pergunta deve ser um número positivo' })
  perguntaId: number;

  @IsInt({ message: 'O ID da nutriz deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da nutriz deve ser um número positivo' })
  nutrizId: number;
}
