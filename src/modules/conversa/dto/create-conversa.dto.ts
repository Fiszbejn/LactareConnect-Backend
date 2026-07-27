import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConversaStatus } from '../entities/conversa.entity';

export class CreateConversaDto {
  @ApiPropertyOptional({
    description: 'Status da conversa',
    enum: ConversaStatus,
    default: ConversaStatus.ABERTA,
  })
  @IsOptional()
  @IsEnum(ConversaStatus, {
    message:
      'O status deve ser um dos valores: aberta, encerrada, encaminhada_humano',
  })
  status?: ConversaStatus;

  @ApiProperty({ description: 'ID da nutriz da conversa', example: 1 })
  @IsInt({ message: 'O ID da nutriz deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da nutriz deve ser um número positivo' })
  nutrizId: number;
}
