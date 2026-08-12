import {
  Body,
  Controller,
  Delete,
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
import { RegiaoAtendimentoService } from './regiao-atendimento.service';
import { CreateRegiaoAtendimentoDto } from './dto/create-regiao-atendimento.dto';
import { UpdateRegiaoAtendimentoDto } from './dto/update-regiao-atendimento.dto';
import { RegiaoAtendimentoResponseDto } from './dto/regiao-atendimento-response.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Regiões de Atendimento')
@ApiBearerAuth('access-token')
@Controller('regioes-atendimento')
export class RegiaoAtendimentoController {
  constructor(
    private readonly regiaoAtendimentoService: RegiaoAtendimentoService,
  ) {}

  @Roles('administrador')
  @ApiOperation({ summary: 'Cadastrar uma região de atendimento' })
  @ApiCreatedResponse({ type: RegiaoAtendimentoResponseDto })
  @Post()
  create(@Body() createRegiaoAtendimentoDto: CreateRegiaoAtendimentoDto) {
    return this.regiaoAtendimentoService.create(createRegiaoAtendimentoDto);
  }

  @ApiOperation({ summary: 'Listar todas as regiões de atendimento' })
  @ApiOkResponse({ type: RegiaoAtendimentoResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.regiaoAtendimentoService.findAll();
  }

  @ApiOperation({ summary: 'Buscar uma região de atendimento pelo id' })
  @ApiOkResponse({ type: RegiaoAtendimentoResponseDto })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.regiaoAtendimentoService.findOne(id);
  }

  @Roles('administrador')
  @ApiOperation({ summary: 'Atualizar uma região de atendimento' })
  @ApiOkResponse({ type: RegiaoAtendimentoResponseDto })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRegiaoAtendimentoDto: UpdateRegiaoAtendimentoDto,
  ) {
    return this.regiaoAtendimentoService.update(
      id,
      updateRegiaoAtendimentoDto,
    );
  }

  @Roles('administrador')
  @ApiOperation({ summary: 'Remover uma região de atendimento' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.regiaoAtendimentoService.remove(id);
  }
}
