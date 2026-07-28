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
import { BancoLeiteService } from './banco-leite.service';
import { CreateBancoLeiteDto } from './dto/create-banco-leite.dto';
import { UpdateBancoLeiteDto } from './dto/update-banco-leite.dto';
import { BancoLeiteResponseDto } from './dto/banco-leite-response.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Bancos de Leite')
@ApiBearerAuth('access-token')
@Controller('bancos-leite')
export class BancoLeiteController {
  constructor(private readonly bancoLeiteService: BancoLeiteService) {}

  @Roles('administrador')
  @ApiOperation({ summary: 'Cadastrar um banco de leite' })
  @ApiCreatedResponse({ type: BancoLeiteResponseDto })
  @Post()
  create(@Body() createBancoLeiteDto: CreateBancoLeiteDto) {
    return this.bancoLeiteService.create(createBancoLeiteDto);
  }

  @ApiOperation({ summary: 'Listar todos os bancos de leite' })
  @ApiOkResponse({ type: BancoLeiteResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.bancoLeiteService.findAll();
  }

  @ApiOperation({ summary: 'Buscar um banco de leite pelo id' })
  @ApiOkResponse({ type: BancoLeiteResponseDto })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bancoLeiteService.findOne(id);
  }

  @Roles('administrador')
  @ApiOperation({ summary: 'Atualizar um banco de leite' })
  @ApiOkResponse({ type: BancoLeiteResponseDto })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBancoLeiteDto: UpdateBancoLeiteDto,
  ) {
    return this.bancoLeiteService.update(id, updateBancoLeiteDto);
  }

  @Roles('administrador')
  @ApiOperation({ summary: 'Remover um banco de leite' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bancoLeiteService.remove(id);
  }
}
