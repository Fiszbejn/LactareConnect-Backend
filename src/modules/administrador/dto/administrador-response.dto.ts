import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Administrador } from '../entities/administrador.entity';

export class AdministradorResponseDto {
  @ApiProperty({ description: 'Id do administrador', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nome completo', example: 'João Souza' })
  nome: string;

  @ApiProperty({
    description: 'E-mail de acesso',
    example: 'joao@lactareconnect.com',
  })
  email: string;

  @ApiProperty({
    description: 'Papel/função do administrador',
    example: 'gestor',
  })
  papel: string;

  @ApiPropertyOptional({
    description: 'Id do banco de leite vinculado, se houver',
    example: 3,
    nullable: true,
  })
  bancoVinculadoId: number | null;
}

export function toAdministradorResponseDto(
  administrador: Administrador,
): AdministradorResponseDto {
  return {
    id: administrador.id,
    nome: administrador.nome,
    email: administrador.email,
    papel: administrador.papel,
    bancoVinculadoId: administrador.bancoVinculado?.id ?? null,
  };
}
