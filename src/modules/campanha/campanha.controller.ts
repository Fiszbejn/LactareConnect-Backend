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
import { CampanhaService } from './campanha.service';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { UpdateCampanhaDto } from './dto/update-campanha.dto';
import { CampanhaResponseDto } from './dto/campanha-response.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Campanhas')
@Roles('administrador')
@ApiBearerAuth('access-token')
@Controller('campanhas')
export class CampanhaController {
  constructor(private readonly campanhaService: CampanhaService) {}

  @ApiOperation({ summary: 'Cadastrar uma campanha' })
  @ApiCreatedResponse({ type: CampanhaResponseDto })
  @Post()
  create(@Body() createCampanhaDto: CreateCampanhaDto) {
    return this.campanhaService.create(createCampanhaDto);
  }

  @ApiOperation({ summary: 'Listar todas as campanhas' })
  @ApiOkResponse({ type: CampanhaResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.campanhaService.findAll();
  }

  @ApiOperation({ summary: 'Buscar uma campanha pelo id' })
  @ApiOkResponse({ type: CampanhaResponseDto })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.campanhaService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar uma campanha' })
  @ApiOkResponse({ type: CampanhaResponseDto })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCampanhaDto: UpdateCampanhaDto,
  ) {
    return this.campanhaService.update(id, updateCampanhaDto);
  }

  @ApiOperation({ summary: 'Remover uma campanha' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.campanhaService.remove(id);
  }
}
