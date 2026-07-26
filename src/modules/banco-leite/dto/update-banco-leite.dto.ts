import { PartialType } from '@nestjs/mapped-types';
import { CreateBancoLeiteDto } from './create-banco-leite.dto';

export class UpdateBancoLeiteDto extends PartialType(CreateBancoLeiteDto) {}
