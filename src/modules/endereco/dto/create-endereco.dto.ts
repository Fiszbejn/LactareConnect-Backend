import { IsInt, IsNotEmpty, IsString, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnderecoDto {
  @ApiProperty({ description: 'CEP', example: '01310-100' })
  @IsString({ message: 'O CEP deve ser um texto' })
  @IsNotEmpty({ message: 'O CEP é obrigatório' })
  cep: string;

  @ApiProperty({ description: 'Nome da rua', example: 'Av. Paulista' })
  @IsString({ message: 'A rua deve ser um texto' })
  @IsNotEmpty({ message: 'A rua é obrigatória' })
  rua: string;

  @ApiProperty({ description: 'Número do imóvel', example: '1000' })
  @IsString({ message: 'O número deve ser um texto' })
  @IsNotEmpty({ message: 'O número é obrigatório' })
  numero: string;

  @ApiProperty({ description: 'Bairro', example: 'Bela Vista' })
  @IsString({ message: 'O bairro deve ser um texto' })
  @IsNotEmpty({ message: 'O bairro é obrigatório' })
  bairro: string;

  @ApiProperty({ description: 'Cidade', example: 'São Paulo' })
  @IsString({ message: 'A cidade deve ser um texto' })
  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  cidade: string;

  @ApiProperty({ description: 'Unidade federativa (sigla)', example: 'SP' })
  @IsString({ message: 'A UF deve ser um texto' })
  @IsNotEmpty({ message: 'A UF é obrigatória' })
  uf: string;

  @ApiProperty({ description: 'ID da nutriz dona do endereço', example: 1 })
  @IsInt({ message: 'O ID da nutriz deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da nutriz deve ser um número positivo' })
  nutrizId: number;
}
