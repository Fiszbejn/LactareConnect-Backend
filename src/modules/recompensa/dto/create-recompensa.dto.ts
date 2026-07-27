import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateRecompensaDto {
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsString({ message: 'O parceiro deve ser um texto' })
  @IsNotEmpty({ message: 'O parceiro é obrigatório' })
  parceiro: string;

  @IsString({ message: 'A categoria deve ser um texto' })
  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  categoria: string;

  @IsInt({ message: 'O custo em gotinhas deve ser um número inteiro' })
  @IsPositive({ message: 'O custo em gotinhas deve ser um número positivo' })
  custoGotinhas: number;

  @IsOptional()
  @IsInt({ message: 'O estoque deve ser um número inteiro' })
  @Min(0, { message: 'O estoque não pode ser negativo' })
  estoque?: number;

  @IsOptional()
  @IsBoolean({ message: 'Ativo deve ser verdadeiro ou falso' })
  ativo?: boolean;

  @IsOptional()
  @IsString({ message: 'A URL da imagem deve ser um texto' })
  imagemUrl?: string;
}
