import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Recompensa } from '../entities/recompensa.entity';

export class RecompensaResponseDto {
  @ApiProperty({ description: 'Id da recompensa', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Nome da recompensa',
    example: 'Kit de higiene para bebê',
  })
  nome: string;

  @ApiProperty({
    description: 'Parceiro fornecedor',
    example: 'Loja Bebê Feliz',
  })
  parceiro: string;

  @ApiProperty({ description: 'Categoria da recompensa', example: 'higiene' })
  categoria: string;

  @ApiProperty({ description: 'Custo em gotinhas', example: 150 })
  custoGotinhas: number;

  @ApiProperty({ description: 'Estoque disponível', example: 10 })
  estoque: number;

  @ApiProperty({ description: 'Se a recompensa está ativa', example: true })
  ativo: boolean;

  @ApiPropertyOptional({
    description: 'URL da imagem',
    example: 'https://storage.lactareconnect.com/recompensas/1.png',
    nullable: true,
  })
  imagemUrl: string | null;
}

export function toRecompensaResponseDto(
  recompensa: Recompensa,
): RecompensaResponseDto {
  return {
    id: recompensa.id,
    nome: recompensa.nome,
    parceiro: recompensa.parceiro,
    categoria: recompensa.categoria,
    custoGotinhas: recompensa.custoGotinhas,
    estoque: recompensa.estoque,
    ativo: recompensa.ativo,
    imagemUrl: recompensa.imagemUrl ?? null,
  };
}
