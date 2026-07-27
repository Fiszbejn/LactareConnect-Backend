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
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';

@ApiTags('Agendamentos')
@Controller('agendamentos')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @ApiOperation({
    summary: 'Agendar uma coleta (exige os 4 exames obrigatórios já aprovados)',
  })
  @Post()
  create(@Body() createAgendamentoDto: CreateAgendamentoDto) {
    return this.agendamentoService.create(createAgendamentoDto);
  }

  @ApiOperation({ summary: 'Listar todos os agendamentos' })
  @Get()
  findAll() {
    return this.agendamentoService.findAll();
  }

  @ApiOperation({ summary: 'Buscar um agendamento pelo id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.agendamentoService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar um agendamento' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAgendamentoDto: UpdateAgendamentoDto,
  ) {
    return this.agendamentoService.update(id, updateAgendamentoDto);
  }
}
