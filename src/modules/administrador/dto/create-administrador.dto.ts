import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAdministradorDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;

  @IsString()
  @IsNotEmpty()
  papel: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  bancoVinculadoId?: number;
}
