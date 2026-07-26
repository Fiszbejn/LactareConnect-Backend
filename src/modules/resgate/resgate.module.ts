import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resgate } from './entities/resgate.entity';
import { ResgateService } from './resgate.service';
import { ResgateController } from './resgate.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Resgate])],
  controllers: [ResgateController],
  providers: [ResgateService],
  exports: [ResgateService],
})
export class ResgateModule {}
