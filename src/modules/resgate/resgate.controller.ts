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
import { ResgateService } from './resgate.service';
import { CreateResgateDto } from './dto/create-resgate.dto';
import { UpdateResgateDto } from './dto/update-resgate.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';

@ApiTags('Resgates')
@ApiBearerAuth('access-token')
@Controller('resgates')
export class ResgateController {
  constructor(private readonly resgateService: ResgateService) {}

  @ApiOperation({
    summary:
      'Resgatar uma recompensa (exige saldo de gotinhas suficiente e recompensa ativa com estoque)',
  })
  @Post()
  create(
    @Body() createResgateDto: CreateResgateDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.resgateService.create(createResgateDto, user);
  }

  @ApiOperation({
    summary:
      'Listar resgates (nutriz vê só os próprios; administrador vê todos)',
  })
  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.resgateService.findAll(user);
  }

  @ApiOperation({ summary: 'Buscar um resgate pelo id' })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.resgateService.findOne(id, user);
  }

  @ApiOperation({ summary: 'Atualizar um resgate' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResgateDto: UpdateResgateDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.resgateService.update(id, updateResgateDto, user);
  }
}
