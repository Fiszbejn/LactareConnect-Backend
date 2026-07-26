import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doacao } from './entities/doacao.entity';
import { DoacaoService } from './doacao.service';
import { DoacaoController } from './doacao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Doacao])],
  controllers: [DoacaoController],
  providers: [DoacaoService],
  exports: [DoacaoService],
})
export class DoacaoModule {}
