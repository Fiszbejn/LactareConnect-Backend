import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Min,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CampanhaCanal } from '../entities/campanha.entity';

export class CreateCampanhaDto {
  @ApiProperty({
    description: 'Nome da campanha',
    example: 'Campanha de Doação de Inverno',
  })
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @ApiProperty({
    description: 'Canal de envio da campanha',
    enum: CampanhaCanal,
  })
  @IsEnum(CampanhaCanal, {
    message:
      'O canal deve ser um dos valores: email, push, sms, whatsapp, inapp',
  })
  canal: CampanhaCanal;

  @ApiPropertyOptional({
    description: 'Quantidade de envios',
    example: 0,
    default: 0,
  })
  @IsOptional()
  @IsInt({ message: 'Os enviados devem ser um número inteiro' })
  @Min(0, { message: 'Os enviados não podem ser negativos' })
  enviados?: number;

  @ApiPropertyOptional({
    description: 'Quantidade de aberturas',
    example: 0,
    default: 0,
  })
  @IsOptional()
  @IsInt({ message: 'As aberturas devem ser um número inteiro' })
  @Min(0, { message: 'As aberturas não podem ser negativas' })
  aberturas?: number;

  @ApiPropertyOptional({
    description: 'Quantidade de cliques',
    example: 0,
    default: 0,
  })
  @IsOptional()
  @IsInt({ message: 'Os cliques devem ser um número inteiro' })
  @Min(0, { message: 'Os cliques não podem ser negativos' })
  cliques?: number;

  @ApiProperty({
    description: 'Data de envio da campanha (ISO 8601)',
    example: '2026-08-01T10:00:00.000Z',
  })
  @IsDateString(
    {},
    {
      message: 'A data de envio deve ser uma data válida (formato ISO 8601)',
    },
  )
  dataEnvio: string;
}
