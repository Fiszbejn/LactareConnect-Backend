import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nutriz } from './entities/nutriz.entity';
import { NutrizService } from './nutriz.service';
import { NutrizController } from './nutriz.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Nutriz])],
  controllers: [NutrizController],
  providers: [NutrizService],
  exports: [NutrizService],
})
export class NutrizModule {}
