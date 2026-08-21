import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversa } from './entities/conversa.entity';
import { ConversaService } from './conversa.service';
import { ConversaController } from './conversa.controller';
import { LilaAiService } from './lila-ai.service';

@Module({
  imports: [TypeOrmModule.forFeature([Conversa])],
  controllers: [ConversaController],
  providers: [ConversaService, LilaAiService],
  exports: [ConversaService],
})
export class ConversaModule {}
