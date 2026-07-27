import { IsDateString, IsInt, IsPositive } from 'class-validator';

export class CreateDoacaoDto {
  @IsInt()
  @IsPositive()
  volumeMl: number;

  @IsDateString()
  dataColeta: string;

  @IsInt()
  @IsPositive()
  nutrizId: number;

  @IsInt()
  @IsPositive()
  agendamentoId: number;
}
