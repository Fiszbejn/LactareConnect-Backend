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
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';

@ApiTags('Endereços')
@ApiBearerAuth('access-token')
@Controller('enderecos')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @ApiOperation({ summary: 'Cadastrar o endereço de uma nutriz' })
  @Post()
  create(
    @Body() createEnderecoDto: CreateEnderecoDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.enderecoService.create(createEnderecoDto, user);
  }

  @ApiOperation({
    summary:
      'Listar endereços (nutriz vê só o próprio; administrador vê todos)',
  })
  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.enderecoService.findAll(user);
  }

  @ApiOperation({ summary: 'Buscar um endereço pelo id' })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.enderecoService.findOne(id, user);
  }

  @ApiOperation({ summary: 'Atualizar um endereço' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEnderecoDto: UpdateEnderecoDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.enderecoService.update(id, updateEnderecoDto, user);
  }

  @ApiOperation({ summary: 'Remover um endereço' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthUser) {
    return this.enderecoService.remove(id, user);
  }
}
