import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBancoLeiteDto {
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsString({ message: 'O endereço deve ser um texto' })
  @IsNotEmpty({ message: 'O endereço é obrigatório' })
  enderecoTexto: string;

  @IsString({ message: 'A área de atendimento deve ser um texto' })
  @IsNotEmpty({ message: 'A área de atendimento é obrigatória' })
  areaAtendimento: string;

  @IsOptional()
  @IsNumber({}, { message: 'A latitude deve ser um número' })
  latitude?: number;

  @IsOptional()
  @IsNumber({}, { message: 'A longitude deve ser um número' })
  longitude?: number;
}
