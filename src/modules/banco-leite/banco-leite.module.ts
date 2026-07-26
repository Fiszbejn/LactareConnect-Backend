import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BancoLeiteLactare } from './entities/banco-leite.entity';
import { BancoLeiteService } from './banco-leite.service';
import { BancoLeiteController } from './banco-leite.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BancoLeiteLactare])],
  controllers: [BancoLeiteController],
  providers: [BancoLeiteService],
  exports: [BancoLeiteService],
})
export class BancoLeiteModule {}
