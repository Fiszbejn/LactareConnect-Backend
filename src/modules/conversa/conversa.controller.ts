import {
  Body,
  Controller,
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
import { ConversaService } from './conversa.service';
import { CreateConversaDto } from './dto/create-conversa.dto';
import { ConversaResponseDto } from './dto/conversa-response.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Conversas')
@Roles('administrador')
@ApiBearerAuth('access-token')
@Controller('conversas')
export class ConversaController {
  constructor(private readonly conversaService: ConversaService) {}

  @ApiOperation({
    summary:
      'Iniciar uma nova conversa com o chatbot (encerra automaticamente a conversa aberta anterior da nutriz)',
  })
  @ApiCreatedResponse({ type: ConversaResponseDto })
  @Post()
  create(@Body() createConversaDto: CreateConversaDto) {
    return this.conversaService.create(createConversaDto);
  }

  @ApiOperation({ summary: 'Listar todas as conversas' })
  @ApiOkResponse({ type: ConversaResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.conversaService.findAll();
  }

  @ApiOperation({ summary: 'Buscar uma conversa pelo id' })
  @ApiOkResponse({ type: ConversaResponseDto })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.conversaService.findOne(id);
  }
}
