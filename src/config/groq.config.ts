import { registerAs } from '@nestjs/config';

export default registerAs('groq', () => ({
  apiKey: process.env.GROQ_API_KEY,
  model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
}));
