import { PartialType } from '@nestjs/mapped-types';
import { CreatePreferenciasUsuarioDto } from './create-preferencias-usuario.dto';

export class UpdatePreferenciasUsuarioDto extends PartialType(
  CreatePreferenciasUsuarioDto,
) {}
