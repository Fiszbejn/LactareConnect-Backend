import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelatorioGerado } from './entities/relatorio-gerado.entity';
import { RelatorioGeradoService } from './relatorio-gerado.service';
import { RelatorioGeradoController } from './relatorio-gerado.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RelatorioGerado])],
  controllers: [RelatorioGeradoController],
  providers: [RelatorioGeradoService],
  exports: [RelatorioGeradoService],
})
export class RelatorioGeradoModule {}
