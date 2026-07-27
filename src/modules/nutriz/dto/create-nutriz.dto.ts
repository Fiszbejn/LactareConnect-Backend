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
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsString({ message: 'O CPF deve ser um texto' })
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  cpf: string;

  @IsString({ message: 'A data de nascimento deve ser um texto' })
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  dataNascimento: string;

  @IsString({ message: 'O telefone deve ser um texto' })
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  telefone: string;

  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email: string;

  @IsString({ message: 'A senha deve ser um texto' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  senha: string;

  @IsOptional()
  @IsEnum(NutrizStatus, {
    message: 'O status deve ser um dos valores: pendente, aprovada, inativa',
  })
  status?: NutrizStatus;
}
