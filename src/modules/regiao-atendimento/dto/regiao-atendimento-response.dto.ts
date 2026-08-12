import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RegiaoAtendimento } from '../entities/regiao-atendimento.entity';

export class RegiaoAtendimentoResponseDto {
  @ApiProperty({ description: 'Id da região de atendimento', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Nome da região de atendimento',
    example: 'Lactare - São Paulo',
  })
  nome: string;

  @ApiProperty({
    description: 'Endereço em texto livre',
    example: 'Rua das Flores, 100 - São Paulo/SP',
  })
  enderecoTexto: string;

  @ApiProperty({
    description: 'Área de atendimento',
    example: 'Zona Sul de São Paulo',
  })
  areaAtendimento: string;

  @ApiPropertyOptional({
    description: 'Latitude',
    example: -23.5629,
    nullable: true,
  })
  latitude: number | null;

  @ApiPropertyOptional({
    description: 'Longitude',
    example: -46.6544,
    nullable: true,
  })
  longitude: number | null;
}

export function toRegiaoAtendimentoResponseDto(
  regiao: RegiaoAtendimento,
): RegiaoAtendimentoResponseDto {
  return {
    id: regiao.id,
    nome: regiao.nome,
    enderecoTexto: regiao.enderecoTexto,
    areaAtendimento: regiao.areaAtendimento,
    latitude: regiao.latitude ?? null,
    longitude: regiao.longitude ?? null,
  };
}
