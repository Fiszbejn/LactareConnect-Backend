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
import { RecompensaService } from './recompensa.service';
import { CreateRecompensaDto } from './dto/create-recompensa.dto';
import { UpdateRecompensaDto } from './dto/update-recompensa.dto';
import { RecompensaResponseDto } from './dto/recompensa-response.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Recompensas')
@ApiBearerAuth('access-token')
@Controller('recompensas')
export class RecompensaController {
  constructor(private readonly recompensaService: RecompensaService) {}

  @Roles('administrador')
  @ApiOperation({ summary: 'Cadastrar uma recompensa' })
  @ApiCreatedResponse({ type: RecompensaResponseDto })
  @Post()
  create(@Body() createRecompensaDto: CreateRecompensaDto) {
    return this.recompensaService.create(createRecompensaDto);
  }

  @ApiOperation({ summary: 'Listar todas as recompensas' })
  @ApiOkResponse({ type: RecompensaResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.recompensaService.findAll();
  }

  @ApiOperation({ summary: 'Buscar uma recompensa pelo id' })
  @ApiOkResponse({ type: RecompensaResponseDto })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recompensaService.findOne(id);
  }

  @Roles('administrador')
  @ApiOperation({ summary: 'Atualizar uma recompensa' })
  @ApiOkResponse({ type: RecompensaResponseDto })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecompensaDto: UpdateRecompensaDto,
  ) {
    return this.recompensaService.update(id, updateRecompensaDto);
  }

  @Roles('administrador')
  @ApiOperation({ summary: 'Remover uma recompensa' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recompensaService.remove(id);
  }
}
