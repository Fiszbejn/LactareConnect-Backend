import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RelatorioGeradoService } from './relatorio-gerado.service';
import { CreateRelatorioGeradoDto } from './dto/create-relatorio-gerado.dto';

@Controller('relatorios-gerados')
export class RelatorioGeradoController {
  constructor(
    private readonly relatorioGeradoService: RelatorioGeradoService,
  ) {}

  @Post()
  create(@Body() createRelatorioGeradoDto: CreateRelatorioGeradoDto) {
    return this.relatorioGeradoService.create(createRelatorioGeradoDto);
  }

  @Get()
  findAll() {
    return this.relatorioGeradoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.relatorioGeradoService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.relatorioGeradoService.remove(id);
  }
}
