import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransacaoGotinhas } from './entities/transacao-gotinhas.entity';
import { TransacaoGotinhasService } from './transacao-gotinhas.service';
import { TransacaoGotinhasController } from './transacao-gotinhas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TransacaoGotinhas])],
  controllers: [TransacaoGotinhasController],
  providers: [TransacaoGotinhasService],
  exports: [TransacaoGotinhasService],
})
export class TransacaoGotinhasModule {}
