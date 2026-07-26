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
import { PerguntaFrequenteService } from './pergunta-frequente.service';
import { CreatePerguntaFrequenteDto } from './dto/create-pergunta-frequente.dto';
import { UpdatePerguntaFrequenteDto } from './dto/update-pergunta-frequente.dto';

@Controller('perguntas-frequentes')
export class PerguntaFrequenteController {
  constructor(
    private readonly perguntaFrequenteService: PerguntaFrequenteService,
  ) {}

  @Post()
  create(@Body() createPerguntaFrequenteDto: CreatePerguntaFrequenteDto) {
    return this.perguntaFrequenteService.create(createPerguntaFrequenteDto);
  }

  @Get()
  findAll() {
    return this.perguntaFrequenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.perguntaFrequenteService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePerguntaFrequenteDto: UpdatePerguntaFrequenteDto,
  ) {
    return this.perguntaFrequenteService.update(id, updatePerguntaFrequenteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.perguntaFrequenteService.remove(id);
  }
}
