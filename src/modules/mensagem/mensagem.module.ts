import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { MensagemService } from './mensagem.service';
import { MensagemController } from './mensagem.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Mensagem])],
  controllers: [MensagemController],
  providers: [MensagemService],
  exports: [MensagemService],
})
export class MensagemModule {}
