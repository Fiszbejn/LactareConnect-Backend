import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PreferenciasUsuarioService } from './preferencias-usuario.service';
import { UpdatePreferenciasUsuarioDto } from './dto/update-preferencias-usuario.dto';

@ApiTags('Preferências do Usuário')
@Controller('preferencias-usuario')
export class PreferenciasUsuarioController {
  constructor(
    private readonly preferenciasUsuarioService: PreferenciasUsuarioService,
  ) {}

  @ApiOperation({ summary: 'Listar todas as preferências de usuário' })
  @Get()
  findAll() {
    return this.preferenciasUsuarioService.findAll();
  }

  @ApiOperation({ summary: 'Buscar preferências pelo id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.preferenciasUsuarioService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar preferências de uma nutriz' })
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
