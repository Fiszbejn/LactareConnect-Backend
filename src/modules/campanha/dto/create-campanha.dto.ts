import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Min,
  IsString,
} from 'class-validator';
import { CampanhaCanal } from '../entities/campanha.entity';

export class CreateCampanhaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEnum(CampanhaCanal)
  canal: CampanhaCanal;

  @IsOptional()
  @IsInt()
  @Min(0)
  enviados?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  aberturas?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  cliques?: number;

  @IsDateString()
  dataEnvio: string;
}
