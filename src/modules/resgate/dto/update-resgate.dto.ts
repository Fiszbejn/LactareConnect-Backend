import { PartialType } from '@nestjs/mapped-types';
import { CreateResgateDto } from './create-resgate.dto';

export class UpdateResgateDto extends PartialType(CreateResgateDto) {}
