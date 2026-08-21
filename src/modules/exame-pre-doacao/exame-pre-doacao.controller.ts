import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ExamePreDoacaoService } from './exame-pre-doacao.service';
import { CreateExamePreDoacaoDto } from './dto/create-exame-pre-doacao.dto';
import { UpdateExamePreDoacaoDto } from './dto/update-exame-pre-doacao.dto';
import { ExamePreDoacaoResponseDto } from './dto/exame-pre-doacao-response.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';

@ApiTags('Exames Pré-Doação')
@ApiBearerAuth('access-token')
@Controller('exames-pre-doacao')
export class ExamePreDoacaoController {
  constructor(private readonly examePreDoacaoService: ExamePreDoacaoService) {}

  @ApiOperation({ summary: 'Registrar um exame pré-doação de uma nutriz' })
  @ApiCreatedResponse({ type: ExamePreDoacaoResponseDto })
  @Post()
  create(
    @Body() createExamePreDoacaoDto: CreateExamePreDoacaoDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.examePreDoacaoService.create(createExamePreDoacaoDto, user);
  }

  @ApiOperation({
    summary:
      'Listar exames pré-doação (nutriz vê só os próprios; administrador vê todos)',
  })
  @ApiOkResponse({ type: ExamePreDoacaoResponseDto, isArray: true })
  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.examePreDoacaoService.findAll(user);
  }

  @ApiOperation({ summary: 'Buscar um exame pré-doação pelo id' })
  @ApiOkResponse({ type: ExamePreDoacaoResponseDto })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.examePreDoacaoService.findOne(id, user);
  }

  @ApiOperation({
    summary:
      'Atualizar um exame pré-doação (status só pode virar "ok" com arquivoUrl)',
  })
  @ApiOkResponse({ type: ExamePreDoacaoResponseDto })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExamePreDoacaoDto: UpdateExamePreDoacaoDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.examePreDoacaoService.update(id, updateExamePreDoacaoDto, user);
  }
}
