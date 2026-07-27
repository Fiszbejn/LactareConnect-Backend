import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PreferenciasUsuarioService } from './preferencias-usuario.service';
import { UpdatePreferenciasUsuarioDto } from './dto/update-preferencias-usuario.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';

@ApiTags('Preferências do Usuário')
@ApiBearerAuth('access-token')
@Controller('preferencias-usuario')
export class PreferenciasUsuarioController {
  constructor(
    private readonly preferenciasUsuarioService: PreferenciasUsuarioService,
  ) {}

  @ApiOperation({
    summary:
      'Listar preferências (nutriz vê só a própria; administrador vê todas)',
  })
  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.preferenciasUsuarioService.findAll(user);
  }

  @ApiOperation({ summary: 'Buscar preferências pelo id' })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.preferenciasUsuarioService.findOne(id, user);
  }

  @ApiOperation({ summary: 'Atualizar preferências de uma nutriz' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePreferenciasUsuarioDto: UpdatePreferenciasUsuarioDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.preferenciasUsuarioService.update(
      id,
      updatePreferenciasUsuarioDto,
      user,
    );
  }
}
