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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RecompensaService } from './recompensa.service';
import { CreateRecompensaDto } from './dto/create-recompensa.dto';
import { UpdateRecompensaDto } from './dto/update-recompensa.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Recompensas')
@ApiBearerAuth('access-token')
@Controller('recompensas')
export class RecompensaController {
  constructor(private readonly recompensaService: RecompensaService) {}

  @Roles('administrador')
  @ApiOperation({ summary: 'Cadastrar uma recompensa' })
  @Post()
  create(@Body() createRecompensaDto: CreateRecompensaDto) {
    return this.recompensaService.create(createRecompensaDto);
  }

  @ApiOperation({ summary: 'Listar todas as recompensas' })
  @Get()
  findAll() {
    return this.recompensaService.findAll();
  }

  @ApiOperation({ summary: 'Buscar uma recompensa pelo id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recompensaService.findOne(id);
  }

  @Roles('administrador')
  @ApiOperation({ summary: 'Atualizar uma recompensa' })
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
