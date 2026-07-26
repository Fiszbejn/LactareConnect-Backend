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
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  parceiro: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsInt()
  @IsPositive()
  custoGotinhas: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  estoque?: number;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @IsOptional()
  @IsString()
  imagemUrl?: string;
}
