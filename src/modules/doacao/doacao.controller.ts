import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DoacaoService } from './doacao.service';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { UpdateDoacaoDto } from './dto/update-doacao.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';

@ApiTags('Doações')
@ApiBearerAuth('access-token')
@Controller('doacoes')
export class DoacaoController {
  constructor(private readonly doacaoService: DoacaoService) {}

  @ApiOperation({
    summary:
      'Registrar uma doação a partir de um agendamento realizado (credita 100 gotinhas)',
  })
  @Post()
  create(
    @Body() createDoacaoDto: CreateDoacaoDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.doacaoService.create(createDoacaoDto, user);
  }

  @ApiOperation({
    summary:
      'Listar doações (nutriz vê só as próprias; administrador vê todas)',
  })
  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.doacaoService.findAll(user);
  }

  @ApiOperation({ summary: 'Buscar uma doação pelo id' })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.doacaoService.findOne(id, user);
  }

  @ApiOperation({ summary: 'Atualizar uma doação' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDoacaoDto: UpdateDoacaoDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.doacaoService.update(id, updateDoacaoDto, user);
  }
}
