import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';
import { ConversaStatus } from '../entities/conversa.entity';

export class CreateConversaDto {
  @IsOptional()
  @IsEnum(ConversaStatus)
  status?: ConversaStatus;

  @IsInt()
  @IsPositive()
  nutrizId: number;
}
