import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { TipoUsuarioAutenticado } from '../types/auth-user.type';

export class LoginDto {
  @ApiProperty({
    description: 'E-mail cadastrado (de nutriz ou administrador)',
    example: 'maria@email.com',
  })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @ApiProperty({ description: 'Senha de acesso', example: 'senha123' })
  @IsString({ message: 'A senha deve ser um texto' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  senha: string;

  @ApiProperty({
    description: 'Tipo de usuário que está fazendo login',
    enum: ['nutriz', 'administrador'],
    example: 'nutriz',
  })
  @IsEnum(['nutriz', 'administrador'], {
    message: 'O tipo deve ser um dos valores: nutriz, administrador',
  })
  tipo: TipoUsuarioAutenticado;
}
