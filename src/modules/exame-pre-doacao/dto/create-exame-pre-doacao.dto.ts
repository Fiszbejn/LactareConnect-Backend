import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ExameStatus, ExameTipo } from '../entities/exame-pre-doacao.entity';

export class CreateExamePreDoacaoDto {
  @IsEnum(ExameTipo, {
    message:
      'O tipo de exame deve ser um dos valores: carteira_pre_natal, hemograma, sorologias, htlv, sorologia_hiv, vdrl, sorologia_hepatites_b_c',
  })
  tipoExame: ExameTipo;

  @IsOptional()
  @IsEnum(ExameStatus, {
    message: 'O status deve ser um dos valores: ok, pendente, faltando',
  })
  status?: ExameStatus;

  @IsOptional()
  @IsString({ message: 'A URL do arquivo deve ser um texto' })
  arquivoUrl?: string;

  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'A data de envio deve ser uma data válida (formato ISO 8601)',
    },
  )
  dataEnvio?: string;

  @IsInt({ message: 'O ID da nutriz deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da nutriz deve ser um número positivo' })
  nutrizId: number;
}
