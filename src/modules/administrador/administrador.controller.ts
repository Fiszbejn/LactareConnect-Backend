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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdministradorService } from './administrador.service';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';

@ApiTags('Administradores')
@Controller('administradores')
export class AdministradorController {
  constructor(private readonly administradorService: AdministradorService) {}

  @ApiOperation({ summary: 'Cadastrar um administrador' })
  @Post()
  create(@Body() createAdministradorDto: CreateAdministradorDto) {
    return this.administradorService.create(createAdministradorDto);
  }

  @ApiOperation({ summary: 'Listar todos os administradores' })
  @Get()
  findAll() {
    return this.administradorService.findAll();
  }

  @ApiOperation({ summary: 'Buscar um administrador pelo id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.administradorService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar um administrador' })
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
