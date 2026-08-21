import { IsDateString, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoacaoDto {
  @ApiProperty({ description: 'Volume doado em ml', example: 200 })
  @IsInt({ message: 'O volume em ml deve ser um número inteiro' })
  @IsPositive({ message: 'O volume em ml deve ser um número positivo' })
  volumeMl: number;

  @ApiProperty({
    description: 'Data da coleta (ISO 8601)',
    example: '2026-08-01T10:00:00.000Z',
  })
  @IsDateString(
    {},
    {
      message: 'A data de coleta deve ser uma data válida (formato ISO 8601)',
    },
  )
  dataColeta: string;

  @ApiProperty({ description: 'ID da nutriz doadora', example: 1 })
  @IsInt({ message: 'O ID da nutriz deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da nutriz deve ser um número positivo' })
  nutrizId: number;

  @ApiProperty({
    description: 'ID do agendamento com status "realizado"',
    example: 1,
  })
  @IsInt({ message: 'O ID do agendamento deve ser um número inteiro' })
  @IsPositive({
    message: 'O ID do agendamento deve ser um número positivo',
  })
  agendamentoId: number;
}
