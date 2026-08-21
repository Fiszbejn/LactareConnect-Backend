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
import { MensagemService } from './mensagem.service';
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import { MensagemResponseDto } from './dto/mensagem-response.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Mensagens')
@Roles('administrador')
@ApiBearerAuth('access-token')
@Controller('mensagens')
export class MensagemController {
  constructor(private readonly mensagemService: MensagemService) {}

  @ApiOperation({
    summary:
      'Criar uma mensagem avulsa (uso administrativo — a nutriz usa ' +
      'POST /conversas/:id/mensagens, que já devolve a resposta da Lila)',
  })
  @ApiCreatedResponse({ type: MensagemResponseDto })
  @Post()
  create(@Body() createMensagemDto: CreateMensagemDto) {
    return this.mensagemService.create(createMensagemDto);
  }

  @ApiOperation({ summary: 'Listar todas as mensagens' })
  @ApiOkResponse({ type: MensagemResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.mensagemService.findAll();
  }

  @ApiOperation({ summary: 'Listar as mensagens de uma conversa específica' })
  @ApiOkResponse({ type: MensagemResponseDto, isArray: true })
  @Get('conversa/:conversaId')
  findByConversa(@Param('conversaId', ParseIntPipe) conversaId: number) {
    return this.mensagemService.findByConversa(conversaId);
  }

  @ApiOperation({ summary: 'Buscar uma mensagem pelo id' })
  @ApiOkResponse({ type: MensagemResponseDto })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mensagemService.findOne(id);
  }
}
