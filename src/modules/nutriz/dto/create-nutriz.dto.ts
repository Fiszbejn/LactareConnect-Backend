import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { NutrizStatus } from '../entities/nutriz.entity';

export class CreateNutrizDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  dataNascimento: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;

  @IsOptional()
  @IsEnum(NutrizStatus)
  status?: NutrizStatus;
}
