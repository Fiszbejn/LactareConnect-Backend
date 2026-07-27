import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConversaService } from './conversa.service';
import { CreateConversaDto } from './dto/create-conversa.dto';

@ApiTags('Conversas')
@Controller('conversas')
export class ConversaController {
  constructor(private readonly conversaService: ConversaService) {}

  @ApiOperation({
    summary:
      'Iniciar uma nova conversa com o chatbot (encerra automaticamente a conversa aberta anterior da nutriz)',
  })
  @Post()
  create(@Body() createConversaDto: CreateConversaDto) {
    return this.conversaService.create(createConversaDto);
  }

  @ApiOperation({ summary: 'Listar todas as conversas' })
  @Get()
  findAll() {
    return this.conversaService.findAll();
  }

  @ApiOperation({ summary: 'Buscar uma conversa pelo id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.conversaService.findOne(id);
  }
}
