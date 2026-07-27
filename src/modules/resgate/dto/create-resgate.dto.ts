import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResgateStatus } from '../entities/resgate.entity';

export class CreateResgateDto {
  @ApiPropertyOptional({
    description: 'Status do resgate',
    enum: ResgateStatus,
    default: ResgateStatus.PENDENTE,
  })
  @IsOptional()
  @IsEnum(ResgateStatus, {
    message: 'O status deve ser um dos valores: pendente, enviado, concluido',
  })
  status?: ResgateStatus;

  @ApiPropertyOptional({
    description: 'Endereço de entrega da recompensa',
    example: 'Rua das Flores, 100 - São Paulo/SP',
  })
  @IsOptional()
  @IsString({ message: 'O endereço de entrega deve ser um texto' })
  enderecoEntrega?: string;

  @ApiProperty({ description: 'ID da nutriz que está resgatando', example: 1 })
  @IsInt({ message: 'O ID da nutriz deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da nutriz deve ser um número positivo' })
  nutrizId: number;

  @ApiProperty({ description: 'ID da recompensa a ser resgatada', example: 1 })
  @IsInt({ message: 'O ID da recompensa deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da recompensa deve ser um número positivo' })
  recompensaId: number;
}
