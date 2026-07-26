import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBancoLeiteDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  enderecoTexto: string;

  @IsString()
  @IsNotEmpty()
  areaAtendimento: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;
}
