import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ConversaService } from './conversa.service';
import { CreateConversaDto } from './dto/create-conversa.dto';

@Controller('conversas')
export class ConversaController {
  constructor(private readonly conversaService: ConversaService) {}

  @Post()
  create(@Body() createConversaDto: CreateConversaDto) {
    return this.conversaService.create(createConversaDto);
  }

  @Get()
  findAll() {
    return this.conversaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.conversaService.findOne(id);
  }
}
