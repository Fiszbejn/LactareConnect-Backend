import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Endereco } from '../entities/endereco.entity';

export class EnderecoResponseDto {
  @ApiProperty({ description: 'Id do endereço', example: 1 })
  id: number;

  @ApiProperty({ description: 'CEP', example: '01310-100' })
  cep: string;

  @ApiProperty({ description: 'Rua', example: 'Avenida Paulista' })
  rua: string;

  @ApiProperty({ description: 'Número', example: '1000' })
  numero: string;

  @ApiProperty({ description: 'Bairro', example: 'Bela Vista' })
  bairro: string;

  @ApiProperty({ description: 'Cidade', example: 'São Paulo' })
  cidade: string;

  @ApiProperty({ description: 'UF', example: 'SP' })
  uf: string;

  @ApiPropertyOptional({
    description: 'Id da nutriz dona do endereço',
    example: 17,
    nullable: true,
  })
  nutrizId: number | null;
}

export function toEnderecoResponseDto(endereco: Endereco): EnderecoResponseDto {
  return {
    id: endereco.id,
    cep: endereco.cep,
    rua: endereco.rua,
    numero: endereco.numero,
    bairro: endereco.bairro,
    cidade: endereco.cidade,
    uf: endereco.uf,
    nutrizId: endereco.nutriz?.id ?? null,
  };
}
