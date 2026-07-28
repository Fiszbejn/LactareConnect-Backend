import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { NutrizService } from './nutriz.service';
import { CreateNutrizDto } from './dto/create-nutriz.dto';
import { UpdateNutrizDto } from './dto/update-nutriz.dto';
import { NutrizResponseDto } from './dto/nutriz-response.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';

@ApiTags('Nutrizes')
@Controller('nutrizes')
export class NutrizController {
  constructor(private readonly nutrizService: NutrizService) {}

  @Public()
  @ApiOperation({
    summary: 'Cadastrar uma nova nutriz (cria também as preferências padrão)',
  })
  @ApiCreatedResponse({ type: NutrizResponseDto })
  @Post()
  create(@Body() createNutrizDto: CreateNutrizDto) {
    return this.nutrizService.create(createNutrizDto);
  }

  @Roles('administrador')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Listar todas as nutrizes (apenas administrador)' })
  @ApiOkResponse({ type: NutrizResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.nutrizService.findAll();
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Buscar uma nutriz pelo id (nutriz só acessa o próprio perfil)',
  })
  @ApiOkResponse({ type: NutrizResponseDto })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.nutrizService.findOne(id, user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary:
      'Atualizar os dados de uma nutriz (nutriz só atualiza o próprio perfil)',
  })
  @ApiOkResponse({ type: NutrizResponseDto })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNutrizDto: UpdateNutrizDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.nutrizService.update(id, updateNutrizDto, user);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Remover uma nutriz (nutriz só remove o próprio perfil)',
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthUser) {
    return this.nutrizService.remove(id, user);
  }
}
