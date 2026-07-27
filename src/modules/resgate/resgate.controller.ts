import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResgateService } from './resgate.service';
import { CreateResgateDto } from './dto/create-resgate.dto';
import { UpdateResgateDto } from './dto/update-resgate.dto';

@ApiTags('Resgates')
@Controller('resgates')
export class ResgateController {
  constructor(private readonly resgateService: ResgateService) {}

  @ApiOperation({
    summary:
      'Resgatar uma recompensa (exige saldo de gotinhas suficiente e recompensa ativa com estoque)',
  })
  @Post()
  create(@Body() createResgateDto: CreateResgateDto) {
    return this.resgateService.create(createResgateDto);
  }

  @ApiOperation({ summary: 'Listar todos os resgates' })
  @Get()
  findAll() {
    return this.resgateService.findAll();
  }

  @ApiOperation({ summary: 'Buscar um resgate pelo id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.resgateService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar um resgate' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResgateDto: UpdateResgateDto,
  ) {
    return this.resgateService.update(id, updateResgateDto);
  }
}
