import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EnviarMensagemDto {
  @ApiProperty({
    description: 'Texto da mensagem da nutriz',
    example: 'Como faço para doar leite?',
  })
  @IsString({ message: 'O texto deve ser um texto' })
  @IsNotEmpty({ message: 'O texto é obrigatório' })
  texto: string;
}
