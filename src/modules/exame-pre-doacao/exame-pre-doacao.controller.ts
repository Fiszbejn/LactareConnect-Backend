import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ExamePreDoacaoService } from './exame-pre-doacao.service';
import { CreateExamePreDoacaoDto } from './dto/create-exame-pre-doacao.dto';
import { UpdateExamePreDoacaoDto } from './dto/update-exame-pre-doacao.dto';

@Controller('exames-pre-doacao')
export class ExamePreDoacaoController {
  constructor(private readonly examePreDoacaoService: ExamePreDoacaoService) {}

  @Post()
  create(@Body() createExamePreDoacaoDto: CreateExamePreDoacaoDto) {
    return this.examePreDoacaoService.create(createExamePreDoacaoDto);
  }

  @Get()
  findAll() {
    return this.examePreDoacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.examePreDoacaoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExamePreDoacaoDto: UpdateExamePreDoacaoDto,
  ) {
    return this.examePreDoacaoService.update(id, updateExamePreDoacaoDto);
  }
}
