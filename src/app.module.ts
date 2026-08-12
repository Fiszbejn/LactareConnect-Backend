import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import geminiConfig from './config/gemini.config';
import { AuthModule } from './modules/auth/auth.module';
import { NutrizModule } from './modules/nutriz/nutriz.module';
import { EnderecoModule } from './modules/endereco/endereco.module';
import { PreferenciasUsuarioModule } from './modules/preferencias-usuario/preferencias-usuario.module';
import { RegiaoAtendimentoModule } from './modules/regiao-atendimento/regiao-atendimento.module';
import { ExamePreDoacaoModule } from './modules/exame-pre-doacao/exame-pre-doacao.module';
import { AgendamentoModule } from './modules/agendamento/agendamento.module';
import { DoacaoModule } from './modules/doacao/doacao.module';
import { RecompensaModule } from './modules/recompensa/recompensa.module';
import { ResgateModule } from './modules/resgate/resgate.module';
import { TransacaoGotinhasModule } from './modules/transacao-gotinhas/transacao-gotinhas.module';
import { PerguntaFrequenteModule } from './modules/pergunta-frequente/pergunta-frequente.module';
import { FeedbackFaqModule } from './modules/feedback-faq/feedback-faq.module';
import { ConversaModule } from './modules/conversa/conversa.module';
import { MensagemModule } from './modules/mensagem/mensagem.module';
import { AdministradorModule } from './modules/administrador/administrador.module';
import { CampanhaModule } from './modules/campanha/campanha.module';
import { RelatorioGeradoModule } from './modules/relatorio-gerado/relatorio-gerado.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, geminiConfig],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'oracle',
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        sid: config.get<string>('database.sid'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        entityPrefix: config.get<string>('database.entityPrefix'),
        synchronize: config.get<boolean>('database.synchronize'),
        logging: config.get<boolean>('database.logging'),
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    NutrizModule,
    EnderecoModule,
    PreferenciasUsuarioModule,
    RegiaoAtendimentoModule,
    ExamePreDoacaoModule,
    AgendamentoModule,
    DoacaoModule,
    RecompensaModule,
    ResgateModule,
    TransacaoGotinhasModule,
    PerguntaFrequenteModule,
    FeedbackFaqModule,
    ConversaModule,
    MensagemModule,
    AdministradorModule,
    CampanhaModule,
    RelatorioGeradoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
