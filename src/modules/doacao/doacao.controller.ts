import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DoacaoService } from './doacao.service';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { UpdateDoacaoDto } from './dto/update-doacao.dto';

@ApiTags('Doações')
@Controller('doacoes')
export class DoacaoController {
  constructor(private readonly doacaoService: DoacaoService) {}

  @ApiOperation({
    summary:
      'Registrar uma doação a partir de um agendamento realizado (credita 100 gotinhas)',
  })
  @Post()
  create(@Body() createDoacaoDto: CreateDoacaoDto) {
    return this.doacaoService.create(createDoacaoDto);
  }

  @ApiOperation({ summary: 'Listar todas as doações' })
  @Get()
  findAll() {
    return this.doacaoService.findAll();
  }

  @ApiOperation({ summary: 'Buscar uma doação pelo id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.doacaoService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar uma doação' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDoacaoDto: UpdateDoacaoDto,
  ) {
    return this.doacaoService.update(id, updateDoacaoDto);
  }
}
