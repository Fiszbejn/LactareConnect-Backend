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
import { CampanhaService } from './campanha.service';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { UpdateCampanhaDto } from './dto/update-campanha.dto';

@Controller('campanhas')
export class CampanhaController {
  constructor(private readonly campanhaService: CampanhaService) {}

  @Post()
  create(@Body() createCampanhaDto: CreateCampanhaDto) {
    return this.campanhaService.create(createCampanhaDto);
  }

  @Get()
  findAll() {
    return this.campanhaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.campanhaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCampanhaDto: UpdateCampanhaDto,
  ) {
    return this.campanhaService.update(id, updateCampanhaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.campanhaService.remove(id);
  }
}
