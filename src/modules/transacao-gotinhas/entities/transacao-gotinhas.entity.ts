import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Nutriz } from '../../nutriz/entities/nutriz.entity';

export enum TransacaoTipo {
  DOACAO = 'doacao',
  EXAME = 'exame',
  INDICACAO = 'indicacao',
  RESGATE = 'resgate',
}

@Entity('transacoes_gotinhas')
export class TransacaoGotinhas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  tipo: TransacaoTipo;

  @Column({ type: 'int' })
  valor: number;

  @CreateDateColumn({ name: 'data' })
  data: Date;

  @ManyToOne(() => Nutriz, (nutriz) => nutriz.transacoesGotinhas)
  @JoinColumn({ name: 'nutriz_id' })
  nutriz: Nutriz;
}
