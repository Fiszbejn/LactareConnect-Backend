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
import { AdministradorService } from './administrador.service';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';
import { AdministradorResponseDto } from './dto/administrador-response.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Administradores')
@Roles('administrador')
@ApiBearerAuth('access-token')
@Controller('administradores')
export class AdministradorController {
  constructor(private readonly administradorService: AdministradorService) {}

  @ApiOperation({ summary: 'Cadastrar um administrador' })
  @ApiCreatedResponse({ type: AdministradorResponseDto })
  @Post()
  create(@Body() createAdministradorDto: CreateAdministradorDto) {
    return this.administradorService.create(createAdministradorDto);
  }

  @ApiOperation({ summary: 'Listar todos os administradores' })
  @ApiOkResponse({ type: AdministradorResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.administradorService.findAll();
  }

  @ApiOperation({ summary: 'Buscar um administrador pelo id' })
  @ApiOkResponse({ type: AdministradorResponseDto })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.administradorService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar um administrador' })
  @ApiOkResponse({ type: AdministradorResponseDto })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdministradorDto: UpdateAdministradorDto,
  ) {
    return this.administradorService.update(id, updateAdministradorDto);
  }

  @ApiOperation({ summary: 'Remover um administrador' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.administradorService.remove(id);
  }
}
