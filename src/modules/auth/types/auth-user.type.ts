import { Request } from 'express';

export type TipoUsuarioAutenticado = 'nutriz' | 'administrador';

export interface AuthUser {
  id: number;
  tipo: TipoUsuarioAutenticado;
  email: string;
}

export interface RequestWithUser extends Request {
  user: AuthUser;
}
