import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRecompensaDto {
  @ApiProperty({
    description: 'Nome da recompensa',
    example: '10% de desconto',
  })
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @ApiProperty({
    description: 'Parceiro que oferece a recompensa',
    example: 'Farmácia Saúde',
  })
  @IsString({ message: 'O parceiro deve ser um texto' })
  @IsNotEmpty({ message: 'O parceiro é obrigatório' })
  parceiro: string;

  @ApiProperty({ description: 'Categoria da recompensa', example: 'desconto' })
  @IsString({ message: 'A categoria deve ser um texto' })
  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  categoria: string;

  @ApiProperty({ description: 'Custo em gotinhas', example: 50 })
  @IsInt({ message: 'O custo em gotinhas deve ser um número inteiro' })
  @IsPositive({ message: 'O custo em gotinhas deve ser um número positivo' })
  custoGotinhas: number;

  @ApiPropertyOptional({
    description: 'Estoque disponível',
    example: 10,
    default: 0,
  })
  @IsOptional()
  @IsInt({ message: 'O estoque deve ser um número inteiro' })
  @Min(0, { message: 'O estoque não pode ser negativo' })
  estoque?: number;

  @ApiPropertyOptional({
    description: 'Se a recompensa está ativa para resgate',
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Ativo deve ser verdadeiro ou falso' })
  ativo?: boolean;

  @ApiPropertyOptional({
    description: 'URL da imagem da recompensa',
    example: 'https://exemplo.com/imagens/recompensa.png',
  })
  @IsOptional()
  @IsString({ message: 'A URL da imagem deve ser um texto' })
  imagemUrl?: string;
}
