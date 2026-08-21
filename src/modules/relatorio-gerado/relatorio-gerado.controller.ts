import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RelatorioGeradoService } from './relatorio-gerado.service';
import { CreateRelatorioGeradoDto } from './dto/create-relatorio-gerado.dto';
import { RelatorioGeradoResponseDto } from './dto/relatorio-gerado-response.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Relatórios Gerados')
@Roles('administrador')
@ApiBearerAuth('access-token')
@Controller('relatorios-gerados')
export class RelatorioGeradoController {
  constructor(
    private readonly relatorioGeradoService: RelatorioGeradoService,
  ) {}

  @ApiOperation({ summary: 'Gerar um relatório' })
  @ApiCreatedResponse({ type: RelatorioGeradoResponseDto })
  @Post()
  create(@Body() createRelatorioGeradoDto: CreateRelatorioGeradoDto) {
    return this.relatorioGeradoService.create(createRelatorioGeradoDto);
  }

  @ApiOperation({ summary: 'Listar todos os relatórios gerados' })
  @ApiOkResponse({ type: RelatorioGeradoResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.relatorioGeradoService.findAll();
  }

  @ApiOperation({ summary: 'Buscar um relatório pelo id' })
  @ApiOkResponse({ type: RelatorioGeradoResponseDto })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.relatorioGeradoService.findOne(id);
  }

  @ApiOperation({ summary: 'Remover um relatório' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.relatorioGeradoService.remove(id);
  }
}
