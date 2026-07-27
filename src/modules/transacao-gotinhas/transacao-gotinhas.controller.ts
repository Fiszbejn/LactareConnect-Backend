import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransacaoGotinhasService } from './transacao-gotinhas.service';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Transações de Gotinhas')
@Roles('administrador')
@ApiBearerAuth('access-token')
@Controller('transacoes-gotinhas')
export class TransacaoGotinhasController {
  constructor(
    private readonly transacaoGotinhasService: TransacaoGotinhasService,
  ) {}

  @ApiOperation({
    summary:
      'Listar todas as transações de gotinhas (extrato/auditoria, gerado internamente por doações e resgates)',
  })
  @Get()
  findAll() {
    return this.transacaoGotinhasService.findAll();
  }

  @ApiOperation({ summary: 'Buscar uma transação de gotinhas pelo id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.transacaoGotinhasService.findOne(id);
  }
}
