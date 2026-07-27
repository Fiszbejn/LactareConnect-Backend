import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ResgateStatus } from '../entities/resgate.entity';

export class CreateResgateDto {
  @IsOptional()
  @IsEnum(ResgateStatus, {
    message: 'O status deve ser um dos valores: pendente, enviado, concluido',
  })
  status?: ResgateStatus;

  @IsOptional()
  @IsString({ message: 'O endereço de entrega deve ser um texto' })
  enderecoEntrega?: string;

  @IsInt({ message: 'O ID da nutriz deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da nutriz deve ser um número positivo' })
  nutrizId: number;

  @IsInt({ message: 'O ID da recompensa deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da recompensa deve ser um número positivo' })
  recompensaId: number;
}
