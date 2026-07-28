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
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { EnderecoResponseDto } from './dto/endereco-response.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';

@ApiTags('Endereços')
@ApiBearerAuth('access-token')
@Controller('enderecos')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @ApiOperation({ summary: 'Cadastrar o endereço de uma nutriz' })
  @ApiCreatedResponse({ type: EnderecoResponseDto })
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
  @ApiOkResponse({ type: EnderecoResponseDto, isArray: true })
  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.enderecoService.findAll(user);
  }

  @ApiOperation({ summary: 'Buscar um endereço pelo id' })
  @ApiOkResponse({ type: EnderecoResponseDto })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.enderecoService.findOne(id, user);
  }

  @ApiOperation({ summary: 'Atualizar um endereço' })
  @ApiOkResponse({ type: EnderecoResponseDto })
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
