import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ResgateService } from './resgate.service';
import { CreateResgateDto } from './dto/create-resgate.dto';
import { UpdateResgateDto } from './dto/update-resgate.dto';

@Controller('resgates')
export class ResgateController {
  constructor(private readonly resgateService: ResgateService) {}

  @Post()
  create(@Body() createResgateDto: CreateResgateDto) {
    return this.resgateService.create(createResgateDto);
  }

  @Get()
  findAll() {
    return this.resgateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.resgateService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResgateDto: UpdateResgateDto,
  ) {
    return this.resgateService.update(id, updateResgateDto);
  }
}
