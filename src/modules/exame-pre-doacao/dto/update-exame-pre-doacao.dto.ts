import { PartialType } from '@nestjs/mapped-types';
import { CreateExamePreDoacaoDto } from './create-exame-pre-doacao.dto';

export class UpdateExamePreDoacaoDto extends PartialType(
  CreateExamePreDoacaoDto,
) {}
