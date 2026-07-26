import { PartialType } from '@nestjs/mapped-types';
import { CreatePerguntaFrequenteDto } from './create-pergunta-frequente.dto';

export class UpdatePerguntaFrequenteDto extends PartialType(
  CreatePerguntaFrequenteDto,
) {}
