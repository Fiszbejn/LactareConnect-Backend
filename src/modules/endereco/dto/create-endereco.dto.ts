import { IsInt, IsNotEmpty, IsString, IsPositive } from 'class-validator';

export class CreateEnderecoDto {
  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsString()
  @IsNotEmpty()
  rua: string;

  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsString()
  @IsNotEmpty()
  bairro: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  uf: string;

  @IsInt()
  @IsPositive()
  nutrizId: number;
}
