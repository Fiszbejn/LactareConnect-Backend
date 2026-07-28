import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FeedbackFaq } from '../entities/feedback-faq.entity';

export class FeedbackFaqResponseDto {
  @ApiProperty({ description: 'Id do feedback', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Se a pergunta foi considerada útil',
    example: true,
  })
  util: boolean;

  @ApiProperty({
    description: 'Data/hora do feedback',
    example: '2026-07-28T10:00:00.000Z',
  })
  data: Date;

  @ApiPropertyOptional({
    description: 'Id da pergunta frequente avaliada',
    example: 3,
    nullable: true,
  })
  perguntaId: number | null;

  @ApiPropertyOptional({
    description: 'Id da nutriz que avaliou',
    example: 17,
    nullable: true,
  })
  nutrizId: number | null;
}

export function toFeedbackFaqResponseDto(
  feedback: FeedbackFaq,
): FeedbackFaqResponseDto {
  return {
    id: feedback.id,
    util: feedback.util,
    data: feedback.data,
    perguntaId: feedback.pergunta?.id ?? null,
    nutrizId: feedback.nutriz?.id ?? null,
  };
}
