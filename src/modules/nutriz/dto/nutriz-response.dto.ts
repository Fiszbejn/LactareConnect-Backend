import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Nutriz, NutrizStatus } from '../entities/nutriz.entity';

export class NutrizResponseDto {
  @ApiProperty({ description: 'Id da nutriz', example: 17 })
  id: number;

  @ApiProperty({ description: 'Nome completo', example: 'Maria Silva' })
  nome: string;

  @ApiProperty({ description: 'CPF', example: '12345678900' })
  cpf: string;

  @ApiProperty({ description: 'Data de nascimento', example: '1995-05-10' })
  dataNascimento: Date;

  @ApiProperty({ description: 'Telefone com DDD', example: '11999999999' })
  telefone: string;

  @ApiProperty({ description: 'E-mail', example: 'maria@exemplo.com' })
  email: string;

  @ApiProperty({ description: 'Status do cadastro', enum: NutrizStatus })
  status: NutrizStatus;

  @ApiProperty({ description: 'Saldo atual de gotinhas', example: 100 })
  saldoGotinhas: number;

  @ApiProperty({
    description: 'Data de cadastro',
    example: '2026-07-01T12:00:00.000Z',
  })
  dataCadastro: Date;

  @ApiPropertyOptional({
    description: 'Id do endereço cadastrado, se houver',
    example: 5,
    nullable: true,
  })
  enderecoId: number | null;

  @ApiPropertyOptional({
    description: 'Id das preferências cadastradas, se houver',
    example: 5,
    nullable: true,
  })
  preferenciasId: number | null;
}

export function toNutrizResponseDto(nutriz: Nutriz): NutrizResponseDto {
  return {
    id: nutriz.id,
    nome: nutriz.nome,
    cpf: nutriz.cpf,
    dataNascimento: nutriz.dataNascimento,
    telefone: nutriz.telefone,
    email: nutriz.email,
    status: nutriz.status,
    saldoGotinhas: nutriz.saldoGotinhas,
    dataCadastro: nutriz.dataCadastro,
    enderecoId: nutriz.endereco?.id ?? null,
    preferenciasId: nutriz.preferencias?.id ?? null,
  };
}
