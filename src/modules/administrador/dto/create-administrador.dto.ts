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
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email: string;

  @IsString({ message: 'A senha deve ser um texto' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  senha: string;

  @IsString({ message: 'O papel deve ser um texto' })
  @IsNotEmpty({ message: 'O papel é obrigatório' })
  papel: string;

  @IsOptional()
  @IsInt({ message: 'O ID do banco vinculado deve ser um número inteiro' })
  @IsPositive({
    message: 'O ID do banco vinculado deve ser um número positivo',
  })
  bancoVinculadoId?: number;
}
