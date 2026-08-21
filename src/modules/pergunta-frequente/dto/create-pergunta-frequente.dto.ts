import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePerguntaFrequenteDto {
  @ApiProperty({ description: 'Categoria da pergunta', example: 'doacao' })
  @IsString({ message: 'A categoria deve ser um texto' })
  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  categoria: string;

  @ApiProperty({
    description: 'Texto da pergunta',
    example: 'Como faço para doar?',
  })
  @IsString({ message: 'A pergunta deve ser um texto' })
  @IsNotEmpty({ message: 'A pergunta é obrigatória' })
  pergunta: string;

  @ApiProperty({
    description: 'Texto da resposta',
    example: 'Agende uma coleta pelo aplicativo.',
  })
  @IsString({ message: 'A resposta deve ser um texto' })
  @IsNotEmpty({ message: 'A resposta é obrigatória' })
  resposta: string;

  @ApiPropertyOptional({
    description: 'Ordem de exibição da pergunta na lista',
    example: 1,
    default: 0,
  })
  @IsOptional()
  @IsInt({ message: 'A ordem deve ser um número inteiro' })
  @Min(0, { message: 'A ordem não pode ser negativa' })
  ordem?: number;
}
