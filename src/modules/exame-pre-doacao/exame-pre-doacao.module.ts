import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamePreDoacao } from './entities/exame-pre-doacao.entity';
import { ExamePreDoacaoService } from './exame-pre-doacao.service';
import { ExamePreDoacaoController } from './exame-pre-doacao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExamePreDoacao])],
  controllers: [ExamePreDoacaoController],
  providers: [ExamePreDoacaoService],
  exports: [ExamePreDoacaoService],
})
export class ExamePreDoacaoModule {}
