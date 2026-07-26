import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferenciasUsuario } from './entities/preferencias-usuario.entity';
import { PreferenciasUsuarioService } from './preferencias-usuario.service';
import { PreferenciasUsuarioController } from './preferencias-usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PreferenciasUsuario])],
  controllers: [PreferenciasUsuarioController],
  providers: [PreferenciasUsuarioService],
  exports: [PreferenciasUsuarioService],
})
export class PreferenciasUsuarioModule {}
