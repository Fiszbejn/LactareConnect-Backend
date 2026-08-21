import { IsBoolean, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackFaqDto {
  @ApiProperty({
    description: 'Se a resposta foi útil para a nutriz',
    example: true,
  })
  @IsBoolean({ message: 'Útil deve ser verdadeiro ou falso' })
  util: boolean;

  @ApiProperty({ description: 'ID da pergunta frequente avaliada', example: 1 })
  @IsInt({ message: 'O ID da pergunta deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da pergunta deve ser um número positivo' })
  perguntaId: number;

  @ApiProperty({ description: 'ID da nutriz que avaliou', example: 1 })
  @IsInt({ message: 'O ID da nutriz deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da nutriz deve ser um número positivo' })
  nutrizId: number;
}
