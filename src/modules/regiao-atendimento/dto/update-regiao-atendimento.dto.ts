import { PartialType } from '@nestjs/mapped-types';
import { CreateRegiaoAtendimentoDto } from './create-regiao-atendimento.dto';

export class UpdateRegiaoAtendimentoDto extends PartialType(
  CreateRegiaoAtendimentoDto,
) {}
