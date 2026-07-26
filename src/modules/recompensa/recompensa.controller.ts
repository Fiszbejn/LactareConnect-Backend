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
import { RecompensaService } from './recompensa.service';
import { CreateRecompensaDto } from './dto/create-recompensa.dto';
import { UpdateRecompensaDto } from './dto/update-recompensa.dto';

@Controller('recompensas')
export class RecompensaController {
  constructor(private readonly recompensaService: RecompensaService) {}

  @Post()
  create(@Body() createRecompensaDto: CreateRecompensaDto) {
    return this.recompensaService.create(createRecompensaDto);
  }

  @Get()
  findAll() {
    return this.recompensaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recompensaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecompensaDto: UpdateRecompensaDto,
  ) {
    return this.recompensaService.update(id, updateRecompensaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recompensaService.remove(id);
  }
}
