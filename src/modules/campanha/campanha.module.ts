import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campanha } from './entities/campanha.entity';
import { CampanhaService } from './campanha.service';
import { CampanhaController } from './campanha.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Campanha])],
  controllers: [CampanhaController],
  providers: [CampanhaService],
  exports: [CampanhaService],
})
export class CampanhaModule {}
