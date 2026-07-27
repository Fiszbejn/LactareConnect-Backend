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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PerguntaFrequenteService } from './pergunta-frequente.service';
import { CreatePerguntaFrequenteDto } from './dto/create-pergunta-frequente.dto';
import { UpdatePerguntaFrequenteDto } from './dto/update-pergunta-frequente.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Perguntas Frequentes')
@ApiBearerAuth('access-token')
@Controller('perguntas-frequentes')
export class PerguntaFrequenteController {
  constructor(
    private readonly perguntaFrequenteService: PerguntaFrequenteService,
  ) {}

  @Roles('administrador')
  @ApiOperation({ summary: 'Cadastrar uma pergunta frequente' })
  @Post()
  create(@Body() createPerguntaFrequenteDto: CreatePerguntaFrequenteDto) {
    return this.perguntaFrequenteService.create(createPerguntaFrequenteDto);
  }

  @ApiOperation({ summary: 'Listar todas as perguntas frequentes' })
  @Get()
  findAll() {
    return this.perguntaFrequenteService.findAll();
  }

  @ApiOperation({ summary: 'Buscar uma pergunta frequente pelo id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.perguntaFrequenteService.findOne(id);
  }

  @Roles('administrador')
  @ApiOperation({ summary: 'Atualizar uma pergunta frequente' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePerguntaFrequenteDto: UpdatePerguntaFrequenteDto,
  ) {
    return this.perguntaFrequenteService.update(id, updatePerguntaFrequenteDto);
  }

  @Roles('administrador')
  @ApiOperation({ summary: 'Remover uma pergunta frequente' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.perguntaFrequenteService.remove(id);
  }
}
