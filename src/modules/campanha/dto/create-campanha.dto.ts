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
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsEnum(CampanhaCanal, {
    message:
      'O canal deve ser um dos valores: email, push, sms, whatsapp, inapp',
  })
  canal: CampanhaCanal;

  @IsOptional()
  @IsInt({ message: 'Os enviados devem ser um número inteiro' })
  @Min(0, { message: 'Os enviados não podem ser negativos' })
  enviados?: number;

  @IsOptional()
  @IsInt({ message: 'As aberturas devem ser um número inteiro' })
  @Min(0, { message: 'As aberturas não podem ser negativas' })
  aberturas?: number;

  @IsOptional()
  @IsInt({ message: 'Os cliques devem ser um número inteiro' })
  @Min(0, { message: 'Os cliques não podem ser negativos' })
  cliques?: number;

  @IsDateString(
    {},
    {
      message: 'A data de envio deve ser uma data válida (formato ISO 8601)',
    },
  )
  dataEnvio: string;
}
