import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRegiaoAtendimentoDto {
  @ApiProperty({
    description: 'Nome da região de atendimento',
    example: 'Lactare - São Paulo',
  })
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @ApiProperty({
    description: 'Endereço completo em texto',
    example: 'Rua das Flores, 100 - São Paulo/SP',
  })
  @IsString({ message: 'O endereço deve ser um texto' })
  @IsNotEmpty({ message: 'O endereço é obrigatório' })
  enderecoTexto: string;

  @ApiProperty({
    description: 'Área/região de atendimento',
    example: 'Zona Sul de São Paulo',
  })
  @IsString({ message: 'A área de atendimento deve ser um texto' })
  @IsNotEmpty({ message: 'A área de atendimento é obrigatória' })
  areaAtendimento: string;

  @ApiPropertyOptional({ description: 'Latitude', example: -23.5505 })
  @IsOptional()
  @IsNumber({}, { message: 'A latitude deve ser um número' })
  latitude?: number;

  @ApiPropertyOptional({ description: 'Longitude', example: -46.6333 })
  @IsOptional()
  @IsNumber({}, { message: 'A longitude deve ser um número' })
  longitude?: number;
}
