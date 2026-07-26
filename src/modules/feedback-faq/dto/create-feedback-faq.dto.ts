import { IsBoolean, IsInt, IsPositive } from 'class-validator';

export class CreateFeedbackFaqDto {
  @IsBoolean()
  util: boolean;

  @IsInt()
  @IsPositive()
  perguntaId: number;

  @IsInt()
  @IsPositive()
  nutrizId: number;
}
