import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAdministradorDto {
  @ApiProperty({ description: 'Nome do administrador', example: 'João Souza' })
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @ApiProperty({
    description: 'E-mail do administrador',
    example: 'joao@lactareconnect.com',
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

  @ApiProperty({
    description: 'Papel/função do administrador',
    example: 'gestor',
  })
  @IsString({ message: 'O papel deve ser um texto' })
  @IsNotEmpty({ message: 'O papel é obrigatório' })
  papel: string;

  @ApiPropertyOptional({
    description: 'ID do banco de leite vinculado, se houver',
    example: 1,
  })
  @IsOptional()
  @IsInt({ message: 'O ID do banco vinculado deve ser um número inteiro' })
  @IsPositive({
    message: 'O ID do banco vinculado deve ser um número positivo',
  })
  bancoVinculadoId?: number;
}
