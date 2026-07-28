import { ConflictException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

const ORACLE_ERRO_CHAVE_ESTRANGEIRA_VIOLADA = 2292;

/**
 * O Oracle recusa o DELETE com ORA-02292 quando existe registro filho
 * apontando para a linha (FK sem ON DELETE CASCADE). Sem isso o erro cru do
 * driver vazava como 500 pro cliente da API.
 */
export function lancarConflitoSeViolarChaveEstrangeira(
  error: unknown,
  mensagem: string,
): never {
  const driverError = (error as { driverError?: { errorNum?: number } })
    ?.driverError;
  if (
    error instanceof QueryFailedError &&
    driverError?.errorNum === ORACLE_ERRO_CHAVE_ESTRANGEIRA_VIOLADA
  ) {
    throw new ConflictException(mensagem);
  }
  throw error;
}
