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
import { EnviarMensagemDto } from '../mensagem/dto/enviar-mensagem.dto';
import { EnviarMensagemResponseDto } from '../mensagem/dto/enviar-mensagem-response.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';

@ApiTags('Conversas')
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
  create(
    @Body() createConversaDto: CreateConversaDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.conversaService.create(createConversaDto, user);
  }

  @ApiOperation({
    summary:
      'Enviar uma mensagem na conversa e receber a resposta da Lila na mesma chamada ' +
      '(hoje: resposta fixa/placeholder; a lógica de geração pode evoluir pra IA de verdade ' +
      'sem mudar este contrato)',
  })
  @ApiCreatedResponse({ type: EnviarMensagemResponseDto })
  @Post(':id/mensagens')
  enviarMensagem(
    @Param('id', ParseIntPipe) id: number,
    @Body() enviarMensagemDto: EnviarMensagemDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.conversaService.enviarMensagem(id, enviarMensagemDto, user);
  }

  @ApiOperation({ summary: 'Listar todas as conversas' })
  @ApiOkResponse({ type: ConversaResponseDto, isArray: true })
  @Roles('administrador')
  @Get()
  findAll() {
    return this.conversaService.findAll();
  }

  @ApiOperation({ summary: 'Buscar uma conversa pelo id' })
  @ApiOkResponse({ type: ConversaResponseDto })
  @Roles('administrador')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.conversaService.findOne(id);
  }
}
