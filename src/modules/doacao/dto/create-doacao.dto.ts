import { IsDateString, IsInt, IsPositive } from 'class-validator';

export class CreateDoacaoDto {
  @IsInt({ message: 'O volume em ml deve ser um número inteiro' })
  @IsPositive({ message: 'O volume em ml deve ser um número positivo' })
  volumeMl: number;

  @IsDateString(
    {},
    {
      message: 'A data de coleta deve ser uma data válida (formato ISO 8601)',
    },
  )
  dataColeta: string;

  @IsInt({ message: 'O ID da nutriz deve ser um número inteiro' })
  @IsPositive({ message: 'O ID da nutriz deve ser um número positivo' })
  nutrizId: number;

  @IsInt({ message: 'O ID do agendamento deve ser um número inteiro' })
  @IsPositive({
    message: 'O ID do agendamento deve ser um número positivo',
  })
  agendamentoId: number;
}
