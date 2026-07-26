import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePreferenciasUsuarioDto {
  @IsOptional()
  @IsBoolean()
  notificacoesAtivas?: boolean;

  @IsOptional()
  @IsString()
  idioma?: string;

  @IsOptional()
  @IsString()
  tema?: string;

  @IsInt()
  @IsPositive()
  nutrizId: number;
}
