import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import Groq from 'groq-sdk';
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
  private readonly client: Groq | null;
  private readonly model: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
    const apiKey = this.configService.get<string>('groq.apiKey');
    this.model = this.configService.get<string>('groq.model')!;
    this.client = apiKey ? new Groq({ apiKey }) : null;

    if (!this.client) {
      this.logger.warn(
        'GROQ_API_KEY não configurada; a Lila vai responder com uma mensagem padrão.',
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

    const systemInstruction = await this.montarSystemInstruction();
    const messages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemInstruction },
      ...historico.map(
        (mensagem): Groq.Chat.Completions.ChatCompletionMessageParam => ({
          role:
            mensagem.remetente === MensagemRemetente.USUARIO
              ? 'user'
              : 'assistant',
          content: mensagem.texto,
        }),
      ),
      { role: 'user', content: perguntaAtual },
    ];

    for (let tentativa = 1; tentativa <= 2; tentativa++) {
      try {
        const response = await this.client.chat.completions.create({
          model: this.model,
          messages,
        });

        return (
          response.choices[0]?.message.content?.trim() || RESPOSTA_INDISPONIVEL
        );
      } catch (error) {
        const status = (error as { status?: number }).status;
        const podeTentarDeNovo = tentativa === 1 && status === 503;

        if (podeTentarDeNovo) {
          this.logger.warn('Groq indisponível (503), tentando novamente...');
          await new Promise((resolve) => setTimeout(resolve, 1000));
          continue;
        }

        this.logger.error('Falha ao chamar a API da Groq', error as Error);
        return RESPOSTA_INDISPONIVEL;
      }
    }

    return RESPOSTA_INDISPONIVEL;
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
      'Nunca invente informações de contato (telefone, e-mail, endereço) que não estejam nas perguntas frequentes abaixo ou no restante desta instrução.',
      'Responda em texto simples, sem markdown (sem **negrito**, listas numeradas, tabelas ou títulos) e sem emojis em excesso.',
      'Use as perguntas frequentes abaixo como base de conhecimento sempre que forem relevantes para a pergunta da pessoa:',
      faq,
    ].join('\n\n');
  }
}
