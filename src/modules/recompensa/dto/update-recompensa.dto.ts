import { PartialType } from '@nestjs/mapped-types';
import { CreateRecompensaDto } from './create-recompensa.dto';

export class UpdateRecompensaDto extends PartialType(CreateRecompensaDto) {}
