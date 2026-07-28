import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BancoLeiteLactare } from '../entities/banco-leite.entity';

export class BancoLeiteResponseDto {
  @ApiProperty({ description: 'Id do banco de leite', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Nome do banco de leite',
    example: 'Banco de Leite Central',
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

export function toBancoLeiteResponseDto(
  banco: BancoLeiteLactare,
): BancoLeiteResponseDto {
  return {
    id: banco.id,
    nome: banco.nome,
    enderecoTexto: banco.enderecoTexto,
    areaAtendimento: banco.areaAtendimento,
    latitude: banco.latitude ?? null,
    longitude: banco.longitude ?? null,
  };
}
