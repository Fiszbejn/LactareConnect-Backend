import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';
import { ConversaStatus } from '../entities/conversa.entity';

export class CreateConversaDto {
  @IsOptional()
  @IsEnum(ConversaStatus, {
    message:
      'O status deve ser um dos valores: aberta, encerrada, encaminhada_humano',
  })
  status?: ConversaStatus;

  @IsInt({ message: 'O ID da nutriz deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da nutriz deve ser um número positivo' })
  nutrizId: number;
}
