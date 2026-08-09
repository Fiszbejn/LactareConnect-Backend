import { ApiProperty } from '@nestjs/swagger';
import { MensagemResponseDto } from './mensagem-response.dto';

export class EnviarMensagemResponseDto {
  @ApiProperty({ description: 'Mensagem da nutriz, já persistida' })
  mensagemUsuario: MensagemResponseDto;

  @ApiProperty({
    description:
      'Resposta da Lila (hoje: texto fixo/placeholder; pode virar IA de verdade sem mudar o contrato)',
  })
  respostaBot: MensagemResponseDto;
}
