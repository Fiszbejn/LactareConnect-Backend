import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { PreferenciasUsuarioService } from './preferencias-usuario.service';
import { UpdatePreferenciasUsuarioDto } from './dto/update-preferencias-usuario.dto';

@Controller('preferencias-usuario')
export class PreferenciasUsuarioController {
  constructor(
    private readonly preferenciasUsuarioService: PreferenciasUsuarioService,
  ) {}

  @Get()
  findAll() {
    return this.preferenciasUsuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.preferenciasUsuarioService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePreferenciasUsuarioDto: UpdatePreferenciasUsuarioDto,
  ) {
    return this.preferenciasUsuarioService.update(
      id,
      updatePreferenciasUsuarioDto,
    );
  }
}
