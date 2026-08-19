// Interface (não class): o payload real do webhook varia entre versões da
// Evolution API, e uma DTO como `class` seria filtrada pelo ValidationPipe
// global (whitelist: true) por não ter decorators do class-validator.
export interface WhatsappWebhookDto {
  event: string;
  instance?: string;
  data?: {
    key?: { remoteJid?: string; fromMe?: boolean; id?: string };
    message?: {
      key?: { remoteJid?: string; fromMe?: boolean; id?: string };
      conversation?: string;
      extendedTextMessage?: { text?: string };
      message?: { conversation?: string };
    };
  };
}
