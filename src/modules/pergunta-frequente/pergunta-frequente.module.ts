import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerguntaFrequente } from './entities/pergunta-frequente.entity';
import { PerguntaFrequenteService } from './pergunta-frequente.service';
import { PerguntaFrequenteController } from './pergunta-frequente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PerguntaFrequente])],
  controllers: [PerguntaFrequenteController],
  providers: [PerguntaFrequenteService],
  exports: [PerguntaFrequenteService],
})
export class PerguntaFrequenteModule {}
