import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recompensa } from './entities/recompensa.entity';
import { RecompensaService } from './recompensa.service';
import { RecompensaController } from './recompensa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Recompensa])],
  controllers: [RecompensaController],
  providers: [RecompensaService],
  exports: [RecompensaService],
})
export class RecompensaModule {}
