import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NutrizStatus } from '../entities/nutriz.entity';

export class CreateNutrizDto {
  @ApiProperty({
    description: 'Nome completo da nutriz',
    example: 'Maria Silva',
  })
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @ApiProperty({ description: 'CPF da nutriz', example: '12345678900' })
  @IsString({ message: 'O CPF deve ser um texto' })
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  cpf: string;

  @ApiProperty({
    description: 'Data de nascimento (ISO 8601)',
    example: '1995-05-10',
  })
  @IsString({ message: 'A data de nascimento deve ser um texto' })
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  dataNascimento: string;

  @ApiProperty({ description: 'Telefone com DDD', example: '11999999999' })
  @IsString({ message: 'O telefone deve ser um texto' })
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  telefone: string;

  @ApiProperty({
    description: 'E-mail da nutriz',
    example: 'maria@exemplo.com',
  })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email: string;

  @ApiProperty({
    description: 'Senha de acesso (mínimo 6 caracteres)',
    example: 'senha123',
    minLength: 6,
  })
  @IsString({ message: 'A senha deve ser um texto' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  senha: string;

  @ApiPropertyOptional({
    description: 'Status do cadastro',
    enum: NutrizStatus,
    default: NutrizStatus.PENDENTE,
  })
  @IsOptional()
  @IsEnum(NutrizStatus, {
    message: 'O status deve ser um dos valores: pendente, aprovada, inativa',
  })
  status?: NutrizStatus;
}
