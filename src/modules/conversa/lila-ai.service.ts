import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GoogleGenAI } from '@google/genai';
import { PerguntaFrequente } from '../pergunta-frequente/entities/pergunta-frequente.entity';
import {
  Mensagem,
  MensagemRemetente,
} from '../mensagem/entities/mensagem.entity';

const RESPOSTA_INDISPONIVEL =
  'Desculpa, não consegui pensar em uma resposta agora. Pode tentar novamente em instantes?';

@Injectable()
export class LilaAiService {
  private readonly logger = new Logger(LilaAiService.name);
  private readonly client: GoogleGenAI | null;
  private readonly model: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
    const apiKey = this.configService.get<string>('gemini.apiKey');
    this.model = this.configService.get<string>('gemini.model')!;
    this.client = apiKey ? new GoogleGenAI({ apiKey }) : null;

    if (!this.client) {
      this.logger.warn(
        'GEMINI_API_KEY não configurada; a Lila vai responder com uma mensagem padrão.',
      );
    }
  }

  async gerarResposta(
    historico: Mensagem[],
    perguntaAtual: string,
  ): Promise<string> {
    if (!this.client) {
      return RESPOSTA_INDISPONIVEL;
    }

    try {
      const contents = [
        ...historico.map((mensagem) => ({
          role:
            mensagem.remetente === MensagemRemetente.USUARIO ? 'user' : 'model',
          parts: [{ text: mensagem.texto }],
        })),
        { role: 'user', parts: [{ text: perguntaAtual }] },
      ];

      const response = await this.client.models.generateContent({
        model: this.model,
        contents,
        config: { systemInstruction: await this.montarSystemInstruction() },
      });

      return response.text?.trim() || RESPOSTA_INDISPONIVEL;
    } catch (error) {
      this.logger.error('Falha ao chamar a API do Gemini', error as Error);
      return RESPOSTA_INDISPONIVEL;
    }
  }

  private async montarSystemInstruction(): Promise<string> {
    const perguntas = await this.dataSource
      .getRepository(PerguntaFrequente)
      .find({ order: { ordem: 'ASC' } });

    const faq = perguntas
      .map((pergunta) => `P: ${pergunta.pergunta}\nR: ${pergunta.resposta}`)
      .join('\n\n');

    return [
      'Você é a Lila, assistente virtual do LactareConnect, um app que conecta pessoas doadoras de leite humano a bancos de leite.',
      'Fale em português do Brasil, em tom acolhedor, próximo e respeitoso, sem soar robótica ou genérica.',
      'Use sempre "leite humano" (nunca "leite materno") e "pessoa doadora" (evite reduzir a identidade da pessoa a "mãe" ou usar termos que pressionem quem está decidindo doar).',
      'Nunca pressione, culpe ou julgue quem está considerando doar, pausou a doação ou desistiu.',
      'Responda de forma breve e clara, focada em dúvidas sobre doação de leite humano, agendamentos em bancos de leite, recompensas (gotinhas) e uso do app.',
      'Se a pergunta fugir totalmente desse escopo, redirecione com gentileza para os temas do app, sem soar rude.',
      'Quando fizer sentido pela conversa, incentive a pessoa a abrir o app do LactareConnect para agendar uma coleta, conferir o saldo de Gotinhas ou ver campanhas ativas — de forma natural, sem repetir isso em toda resposta nem soar como propaganda.',
      'Use as perguntas frequentes abaixo como base de conhecimento sempre que forem relevantes para a pergunta da pessoa:',
      faq,
    ].join('\n\n');
  }
}
