import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TransacaoGotinhasService } from './transacao-gotinhas.service';

@Controller('transacoes-gotinhas')
export class TransacaoGotinhasController {
  constructor(
    private readonly transacaoGotinhasService: TransacaoGotinhasService,
  ) {}

  @Get()
  findAll() {
    return this.transacaoGotinhasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.transacaoGotinhasService.findOne(id);
  }
}
