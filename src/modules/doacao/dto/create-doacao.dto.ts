import { IsDateString, IsInt, IsOptional, IsPositive } from 'class-validator';

export class CreateDoacaoDto {
  @IsInt()
  @IsPositive()
  volumeMl: number;

  @IsDateString()
  dataColeta: string;

  @IsInt()
  @IsPositive()
  nutrizId: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  agendamentoId?: number;
}
