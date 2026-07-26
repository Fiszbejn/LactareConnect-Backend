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
import { NutrizService } from './nutriz.service';
import { CreateNutrizDto } from './dto/create-nutriz.dto';
import { UpdateNutrizDto } from './dto/update-nutriz.dto';

@Controller('nutrizes')
export class NutrizController {
  constructor(private readonly nutrizService: NutrizService) {}

  @Post()
  create(@Body() createNutrizDto: CreateNutrizDto) {
    return this.nutrizService.create(createNutrizDto);
  }

  @Get()
  findAll() {
    return this.nutrizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.nutrizService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNutrizDto: UpdateNutrizDto,
  ) {
    return this.nutrizService.update(id, updateNutrizDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.nutrizService.remove(id);
  }
}
