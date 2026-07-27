import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePreferenciasUsuarioDto {
  @ApiPropertyOptional({
    description: 'Se as notificações estão ativas',
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Notificações ativas deve ser verdadeiro ou falso' })
  notificacoesAtivas?: boolean;

  @ApiPropertyOptional({ description: 'Idioma preferido', example: 'pt-BR' })
  @IsOptional()
  @IsString({ message: 'O idioma deve ser um texto' })
  idioma?: string;

  @ApiPropertyOptional({
    description: 'Tema visual preferido',
    example: 'claro',
  })
  @IsOptional()
  @IsString({ message: 'O tema deve ser um texto' })
  tema?: string;

  @ApiProperty({
    description: 'ID da nutriz dona das preferências',
    example: 1,
  })
  @IsInt({ message: 'O ID da nutriz deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da nutriz deve ser um número positivo' })
  nutrizId: number;
}
