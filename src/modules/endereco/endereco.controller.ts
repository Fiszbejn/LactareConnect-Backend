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
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@ApiTags('Endereços')
@Controller('enderecos')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @ApiOperation({ summary: 'Cadastrar o endereço de uma nutriz' })
  @Post()
  create(@Body() createEnderecoDto: CreateEnderecoDto) {
    return this.enderecoService.create(createEnderecoDto);
  }

  @ApiOperation({ summary: 'Listar todos os endereços' })
  @Get()
  findAll() {
    return this.enderecoService.findAll();
  }

  @ApiOperation({ summary: 'Buscar um endereço pelo id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.enderecoService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar um endereço' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEnderecoDto: UpdateEnderecoDto,
  ) {
    return this.enderecoService.update(id, updateEnderecoDto);
  }

  @ApiOperation({ summary: 'Remover um endereço' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.enderecoService.remove(id);
  }
}
