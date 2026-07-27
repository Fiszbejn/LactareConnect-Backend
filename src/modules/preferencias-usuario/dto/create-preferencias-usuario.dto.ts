import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePreferenciasUsuarioDto {
  @IsOptional()
  @IsBoolean({ message: 'Notificações ativas deve ser verdadeiro ou falso' })
  notificacoesAtivas?: boolean;

  @IsOptional()
  @IsString({ message: 'O idioma deve ser um texto' })
  idioma?: string;

  @IsOptional()
  @IsString({ message: 'O tema deve ser um texto' })
  tema?: string;

  @IsInt({ message: 'O ID da nutriz deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da nutriz deve ser um número positivo' })
  nutrizId: number;
}
