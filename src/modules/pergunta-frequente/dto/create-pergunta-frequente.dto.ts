import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreatePerguntaFrequenteDto {
  @IsString({ message: 'A categoria deve ser um texto' })
  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  categoria: string;

  @IsString({ message: 'A pergunta deve ser um texto' })
  @IsNotEmpty({ message: 'A pergunta é obrigatória' })
  pergunta: string;

  @IsString({ message: 'A resposta deve ser um texto' })
  @IsNotEmpty({ message: 'A resposta é obrigatória' })
  resposta: string;

  @IsOptional()
  @IsInt({ message: 'A ordem deve ser um número inteiro' })
  @Min(0, { message: 'A ordem não pode ser negativa' })
  ordem?: number;
}
