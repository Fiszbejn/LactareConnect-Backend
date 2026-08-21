import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EvolutionApiService {
  private readonly logger = new Logger(EvolutionApiService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async enviarMensagem(numero: string, texto: string): Promise<void> {
    const baseUrl = this.configService.get<string>('whatsapp.evolutionApiUrl');
    const apiKey = this.configService.get<string>('whatsapp.evolutionApiKey');
    const instance = this.configService.get<string>(
      'whatsapp.evolutionInstanceName',
    );

    if (!baseUrl || !apiKey) {
      this.logger.warn(
        'Evolution API não configurada; mensagem de WhatsApp não enviada.',
      );
      return;
    }

    try {
      await firstValueFrom(
        this.httpService.post(
          `${baseUrl}/message/sendText/${instance}`,
          { number: numero, text: texto },
          { headers: { apikey: apiKey } },
        ),
      );
    } catch (error) {
      this.logger.error(
        'Falha ao enviar mensagem via Evolution API',
        error as Error,
      );
    }
  }
}
