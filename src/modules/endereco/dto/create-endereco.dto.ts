import { IsInt, IsNotEmpty, IsString, IsPositive } from 'class-validator';

export class CreateEnderecoDto {
  @IsString({ message: 'O CEP deve ser um texto' })
  @IsNotEmpty({ message: 'O CEP é obrigatório' })
  cep: string;

  @IsString({ message: 'A rua deve ser um texto' })
  @IsNotEmpty({ message: 'A rua é obrigatória' })
  rua: string;

  @IsString({ message: 'O número deve ser um texto' })
  @IsNotEmpty({ message: 'O número é obrigatório' })
  numero: string;

  @IsString({ message: 'O bairro deve ser um texto' })
  @IsNotEmpty({ message: 'O bairro é obrigatório' })
  bairro: string;

  @IsString({ message: 'A cidade deve ser um texto' })
  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  cidade: string;

  @IsString({ message: 'A UF deve ser um texto' })
  @IsNotEmpty({ message: 'A UF é obrigatória' })
  uf: string;

  @IsInt({ message: 'O ID da nutriz deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da nutriz deve ser um número positivo' })
  nutrizId: number;
}
