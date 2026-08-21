import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PreferenciasUsuario } from '../entities/preferencias-usuario.entity';

export class PreferenciasUsuarioResponseDto {
  @ApiProperty({ description: 'Id das preferências', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Se as notificações estão ativas',
    example: true,
  })
  notificacoesAtivas: boolean;

  @ApiProperty({ description: 'Idioma preferido', example: 'pt-BR' })
  idioma: string;

  @ApiProperty({ description: 'Tema preferido', example: 'claro' })
  tema: string;

  @ApiPropertyOptional({
    description: 'Id da nutriz',
    example: 17,
    nullable: true,
  })
  nutrizId: number | null;
}

export function toPreferenciasUsuarioResponseDto(
  preferencias: PreferenciasUsuario,
): PreferenciasUsuarioResponseDto {
  return {
    id: preferencias.id,
    notificacoesAtivas: preferencias.notificacoesAtivas,
    idioma: preferencias.idioma,
    tema: preferencias.tema,
    nutrizId: preferencias.nutriz?.id ?? null,
  };
}
