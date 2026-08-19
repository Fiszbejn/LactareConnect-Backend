import {
  Body,
  Controller,
  ForbiddenException,
  Headers,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiExcludeController } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { ConversaService } from '../conversa/conversa.service';
import { EvolutionApiService } from './evolution-api.service';
import type { WhatsappWebhookDto } from './dto/whatsapp-webhook.dto';

@ApiExcludeController()
@Controller('webhooks/whatsapp')
export class WhatsappWebhookController {
  constructor(
    private readonly configService: ConfigService,
    private readonly conversaService: ConversaService,
    private readonly evolutionApiService: EvolutionApiService,
  ) {}

  @Public()
  @Post()
  async receber(
    @Body() payload: WhatsappWebhookDto,
    @Headers('x-webhook-secret') secret: string,
  ) {
    const segredoEsperado = this.configService.get<string>(
      'whatsapp.webhookSecret',
    );
    if (segredoEsperado && secret !== segredoEsperado) {
      throw new ForbiddenException('Assinatura do webhook inválida');
    }

    if (payload.event !== 'messages.upsert') {
      return { ok: true };
    }

    // A profundidade de `key`/`message` varia entre versões da Evolution API.
    const key = payload.data?.key ?? payload.data?.message?.key;
    const texto =
      payload.data?.message?.conversation ??
      payload.data?.message?.extendedTextMessage?.text ??
      payload.data?.message?.message?.conversation;

    if (!key || key.fromMe || !key.remoteJid || !texto) {
      return { ok: true };
    }

    const telefone = key.remoteJid.split('@')[0];
    const resposta = await this.conversaService.receberMensagemWhatsapp(
      telefone,
      texto,
    );
    if (resposta) {
      await this.evolutionApiService.enviarMensagem(telefone, resposta);
    }

    return { ok: true };
  }
}
