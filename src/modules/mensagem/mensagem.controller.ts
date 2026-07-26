import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MensagemService } from './mensagem.service';
import { CreateMensagemDto } from './dto/create-mensagem.dto';

@Controller('mensagens')
export class MensagemController {
  constructor(private readonly mensagemService: MensagemService) {}

  @Post()
  create(@Body() createMensagemDto: CreateMensagemDto) {
    return this.mensagemService.create(createMensagemDto);
  }

  @Get()
  findAll() {
    return this.mensagemService.findAll();
  }

  @Get('conversa/:conversaId')
  findByConversa(@Param('conversaId', ParseIntPipe) conversaId: number) {
    return this.mensagemService.findByConversa(conversaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mensagemService.findOne(id);
  }
}
