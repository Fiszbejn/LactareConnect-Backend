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
  @IsEnum(ResgateStatus)
  status?: ResgateStatus;

  @IsOptional()
  @IsString()
  enderecoEntrega?: string;

  @IsInt()
  @IsPositive()
  nutrizId: number;

  @IsInt()
  @IsPositive()
  recompensaId: number;
}
