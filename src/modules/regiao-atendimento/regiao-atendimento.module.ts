import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegiaoAtendimento } from './entities/regiao-atendimento.entity';
import { RegiaoAtendimentoService } from './regiao-atendimento.service';
import { RegiaoAtendimentoController } from './regiao-atendimento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RegiaoAtendimento])],
  controllers: [RegiaoAtendimentoController],
  providers: [RegiaoAtendimentoService],
  exports: [RegiaoAtendimentoService],
})
export class RegiaoAtendimentoModule {}
