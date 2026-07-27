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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BancoLeiteService } from './banco-leite.service';
import { CreateBancoLeiteDto } from './dto/create-banco-leite.dto';
import { UpdateBancoLeiteDto } from './dto/update-banco-leite.dto';

@ApiTags('Bancos de Leite')
@Controller('bancos-leite')
export class BancoLeiteController {
  constructor(private readonly bancoLeiteService: BancoLeiteService) {}

  @ApiOperation({ summary: 'Cadastrar um banco de leite' })
  @Post()
  create(@Body() createBancoLeiteDto: CreateBancoLeiteDto) {
    return this.bancoLeiteService.create(createBancoLeiteDto);
  }

  @ApiOperation({ summary: 'Listar todos os bancos de leite' })
  @Get()
  findAll() {
    return this.bancoLeiteService.findAll();
  }

  @ApiOperation({ summary: 'Buscar um banco de leite pelo id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bancoLeiteService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar um banco de leite' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBancoLeiteDto: UpdateBancoLeiteDto,
  ) {
    return this.bancoLeiteService.update(id, updateBancoLeiteDto);
  }

  @ApiOperation({ summary: 'Remover um banco de leite' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bancoLeiteService.remove(id);
  }
}
