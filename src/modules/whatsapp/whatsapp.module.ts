import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConversaModule } from '../conversa/conversa.module';
import { EvolutionApiService } from './evolution-api.service';
import { WhatsappWebhookController } from './whatsapp-webhook.controller';

@Module({
  imports: [HttpModule, ConversaModule],
  controllers: [WhatsappWebhookController],
  providers: [EvolutionApiService],
})
export class WhatsappModule {}
