import { registerAs } from '@nestjs/config';

export default registerAs('whatsapp', () => ({
  evolutionApiUrl: process.env.EVOLUTION_API_URL,
  evolutionApiKey: process.env.EVOLUTION_API_KEY,
  evolutionInstanceName:
    process.env.EVOLUTION_INSTANCE_NAME || 'lactareconnect',
  webhookSecret: process.env.WHATSAPP_WEBHOOK_SECRET,
}));
