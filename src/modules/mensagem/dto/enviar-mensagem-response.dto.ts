import { ApiProperty } from '@nestjs/swagger';
import { MensagemResponseDto } from './mensagem-response.dto';

export class EnviarMensagemResponseDto {
  @ApiProperty({ description: 'Mensagem da nutriz, já persistida' })
  mensagemUsuario: MensagemResponseDto;

  @ApiProperty({ description: 'Resposta da Lila, gerada em tempo real por IA' })
  respostaBot: MensagemResponseDto;
}
