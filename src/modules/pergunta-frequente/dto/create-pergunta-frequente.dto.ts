import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreatePerguntaFrequenteDto {
  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsString()
  @IsNotEmpty()
  pergunta: string;

  @IsString()
  @IsNotEmpty()
  resposta: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  ordem?: number;
}
