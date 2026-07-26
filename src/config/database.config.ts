import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'oracle' as const,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '1521', 10),
  sid: process.env.DB_SID,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entityPrefix: 'LC_',
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  autoLoadEntities: true,
}));
