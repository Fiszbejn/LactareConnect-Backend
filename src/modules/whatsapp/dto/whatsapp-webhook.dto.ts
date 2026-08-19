export class WhatsappWebhookDto {
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
