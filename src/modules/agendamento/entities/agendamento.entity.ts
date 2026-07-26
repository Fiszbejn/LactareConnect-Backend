import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Nutriz } from '../../nutriz/entities/nutriz.entity';
import { BancoLeiteLactare } from '../../banco-leite/entities/banco-leite.entity';
import { Doacao } from '../../doacao/entities/doacao.entity';

export enum AgendamentoStatus {
  AGENDADO = 'agendado',
  REALIZADO = 'realizado',
  CANCELADO = 'cancelado',
}

@Entity('agendamentos')
export class Agendamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'data_coleta', type: 'date' })
  dataColeta: Date;

  @Column({ length: 5 })
  horario: string;

  @Column({
    type: 'varchar',
    default: AgendamentoStatus.AGENDADO,
  })
  status: AgendamentoStatus;

  @ManyToOne(() => Nutriz, (nutriz) => nutriz.agendamentos)
  @JoinColumn({ name: 'nutriz_id' })
  nutriz: Nutriz;

  @ManyToOne(() => BancoLeiteLactare, (banco) => banco.agendamentos)
  @JoinColumn({ name: 'banco_id' })
  banco: BancoLeiteLactare;

  @OneToOne(() => Doacao, (doacao) => doacao.agendamento)
  doacao: Doacao;
}
