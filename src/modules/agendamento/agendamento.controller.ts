import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';

@ApiTags('Agendamentos')
@ApiBearerAuth('access-token')
@Controller('agendamentos')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @ApiOperation({
    summary: 'Agendar uma coleta (exige os 4 exames obrigatórios já aprovados)',
  })
  @Post()
  create(
    @Body() createAgendamentoDto: CreateAgendamentoDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.agendamentoService.create(createAgendamentoDto, user);
  }

  @ApiOperation({
    summary:
      'Listar agendamentos (nutriz vê só os próprios; administrador vê todos)',
  })
  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.agendamentoService.findAll(user);
  }

  @ApiOperation({ summary: 'Buscar um agendamento pelo id' })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.agendamentoService.findOne(id, user);
  }

  @ApiOperation({ summary: 'Atualizar um agendamento' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAgendamentoDto: UpdateAgendamentoDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.agendamentoService.update(id, updateAgendamentoDto, user);
  }
}
