import { registerAs } from '@nestjs/config';

export default registerAs('seedAdmin', () => ({
  nome: process.env.SEED_ADMIN_NOME || 'Administrador Inicial',
  email: process.env.SEED_ADMIN_EMAIL,
  senha: process.env.SEED_ADMIN_SENHA,
}));
