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
import { NutrizService } from './nutriz.service';
import { CreateNutrizDto } from './dto/create-nutriz.dto';
import { UpdateNutrizDto } from './dto/update-nutriz.dto';

@ApiTags('Nutrizes')
@Controller('nutrizes')
export class NutrizController {
  constructor(private readonly nutrizService: NutrizService) {}

  @ApiOperation({
    summary: 'Cadastrar uma nova nutriz (cria também as preferências padrão)',
  })
  @Post()
  create(@Body() createNutrizDto: CreateNutrizDto) {
    return this.nutrizService.create(createNutrizDto);
  }

  @ApiOperation({ summary: 'Listar todas as nutrizes' })
  @Get()
  findAll() {
    return this.nutrizService.findAll();
  }

  @ApiOperation({ summary: 'Buscar uma nutriz pelo id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.nutrizService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar os dados de uma nutriz' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNutrizDto: UpdateNutrizDto,
  ) {
    return this.nutrizService.update(id, updateNutrizDto);
  }

  @ApiOperation({ summary: 'Remover uma nutriz' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.nutrizService.remove(id);
  }
}
