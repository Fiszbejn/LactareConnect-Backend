import { PartialType } from '@nestjs/mapped-types';
import { CreateNutrizDto } from './create-nutriz.dto';

export class UpdateNutrizDto extends PartialType(CreateNutrizDto) {}
