import { SetMetadata } from '@nestjs/common';
import { TipoUsuarioAutenticado } from '../types/auth-user.type';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: TipoUsuarioAutenticado[]) =>
  SetMetadata(ROLES_KEY, roles);
