import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MensagemService } from './mensagem.service';
import { CreateMensagemDto } from './dto/create-mensagem.dto';

@ApiTags('Mensagens')
@Controller('mensagens')
export class MensagemController {
  constructor(private readonly mensagemService: MensagemService) {}

  @ApiOperation({
    summary: 'Enviar uma mensagem (bloqueada se a conversa estiver encerrada)',
  })
  @Post()
  create(@Body() createMensagemDto: CreateMensagemDto) {
    return this.mensagemService.create(createMensagemDto);
  }

  @ApiOperation({ summary: 'Listar todas as mensagens' })
  @Get()
  findAll() {
    return this.mensagemService.findAll();
  }

  @ApiOperation({ summary: 'Listar as mensagens de uma conversa específica' })
  @Get('conversa/:conversaId')
  findByConversa(@Param('conversaId', ParseIntPipe) conversaId: number) {
    return this.mensagemService.findByConversa(conversaId);
  }

  @ApiOperation({ summary: 'Buscar uma mensagem pelo id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mensagemService.findOne(id);
  }
}
