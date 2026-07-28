import { ApiProperty } from '@nestjs/swagger';
import { PerguntaFrequente } from '../entities/pergunta-frequente.entity';

export class PerguntaFrequenteResponseDto {
  @ApiProperty({ description: 'Id da pergunta', example: 1 })
  id: number;

  @ApiProperty({ description: 'Categoria da pergunta', example: 'doacao' })
  categoria: string;

  @ApiProperty({
    description: 'Pergunta',
    example: 'Quem pode doar leite materno?',
  })
  pergunta: string;

  @ApiProperty({
    description: 'Resposta',
    example: 'Qualquer nutriz saudável, após avaliação dos exames.',
  })
  resposta: string;

  @ApiProperty({ description: 'Ordem de exibição', example: 1 })
  ordem: number;
}

export function toPerguntaFrequenteResponseDto(
  pergunta: PerguntaFrequente,
): PerguntaFrequenteResponseDto {
  return {
    id: pergunta.id,
    categoria: pergunta.categoria,
    pergunta: pergunta.pergunta,
    resposta: pergunta.resposta,
    ordem: pergunta.ordem,
  };
}
