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
import { AdministradorService } from './administrador.service';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';

@Controller('administradores')
export class AdministradorController {
  constructor(private readonly administradorService: AdministradorService) {}

  @Post()
  create(@Body() createAdministradorDto: CreateAdministradorDto) {
    return this.administradorService.create(createAdministradorDto);
  }

  @Get()
  findAll() {
    return this.administradorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.administradorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdministradorDto: UpdateAdministradorDto,
  ) {
    return this.administradorService.update(id, updateAdministradorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.administradorService.remove(id);
  }
}
