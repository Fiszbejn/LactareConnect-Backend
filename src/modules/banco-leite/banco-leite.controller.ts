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
import { BancoLeiteService } from './banco-leite.service';
import { CreateBancoLeiteDto } from './dto/create-banco-leite.dto';
import { UpdateBancoLeiteDto } from './dto/update-banco-leite.dto';

@Controller('bancos-leite')
export class BancoLeiteController {
  constructor(private readonly bancoLeiteService: BancoLeiteService) {}

  @Post()
  create(@Body() createBancoLeiteDto: CreateBancoLeiteDto) {
    return this.bancoLeiteService.create(createBancoLeiteDto);
  }

  @Get()
  findAll() {
    return this.bancoLeiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bancoLeiteService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBancoLeiteDto: UpdateBancoLeiteDto,
  ) {
    return this.bancoLeiteService.update(id, updateBancoLeiteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bancoLeiteService.remove(id);
  }
}
