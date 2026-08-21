import { ApiProperty } from '@nestjs/swagger';
import { Campanha, CampanhaCanal } from '../entities/campanha.entity';

export class CampanhaResponseDto {
  @ApiProperty({ description: 'Id da campanha', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Nome da campanha',
    example: 'Campanha Agosto Dourado',
  })
  nome: string;

  @ApiProperty({ description: 'Canal de envio', enum: CampanhaCanal })
  canal: CampanhaCanal;

  @ApiProperty({ description: 'Quantidade de envios', example: 500 })
  enviados: number;

  @ApiProperty({ description: 'Quantidade de aberturas', example: 200 })
  aberturas: number;

  @ApiProperty({ description: 'Quantidade de cliques', example: 50 })
  cliques: number;

  @ApiProperty({
    description: 'Data/hora do envio',
    example: '2026-08-01T09:00:00.000Z',
  })
  dataEnvio: Date;
}

export function toCampanhaResponseDto(campanha: Campanha): CampanhaResponseDto {
  return {
    id: campanha.id,
    nome: campanha.nome,
    canal: campanha.canal,
    enviados: campanha.enviados,
    aberturas: campanha.aberturas,
    cliques: campanha.cliques,
    dataEnvio: campanha.dataEnvio,
  };
}
