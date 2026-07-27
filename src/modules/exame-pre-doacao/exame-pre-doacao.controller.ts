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
import { ExamePreDoacaoService } from './exame-pre-doacao.service';
import { CreateExamePreDoacaoDto } from './dto/create-exame-pre-doacao.dto';
import { UpdateExamePreDoacaoDto } from './dto/update-exame-pre-doacao.dto';

@ApiTags('Exames Pré-Doação')
@Controller('exames-pre-doacao')
export class ExamePreDoacaoController {
  constructor(private readonly examePreDoacaoService: ExamePreDoacaoService) {}

  @ApiOperation({ summary: 'Registrar um exame pré-doação de uma nutriz' })
  @Post()
  create(@Body() createExamePreDoacaoDto: CreateExamePreDoacaoDto) {
    return this.examePreDoacaoService.create(createExamePreDoacaoDto);
  }

  @ApiOperation({ summary: 'Listar todos os exames pré-doação' })
  @Get()
  findAll() {
    return this.examePreDoacaoService.findAll();
  }

  @ApiOperation({ summary: 'Buscar um exame pré-doação pelo id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.examePreDoacaoService.findOne(id);
  }

  @ApiOperation({
    summary:
      'Atualizar um exame pré-doação (status só pode virar "ok" com arquivoUrl)',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExamePreDoacaoDto: UpdateExamePreDoacaoDto,
  ) {
    return this.examePreDoacaoService.update(id, updateExamePreDoacaoDto);
  }
}
