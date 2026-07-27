import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Nutriz } from '../../nutriz/entities/nutriz.entity';
import { Agendamento } from '../../agendamento/entities/agendamento.entity';

@Entity('doacoes')
export class Doacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'volume_ml', type: 'int' })
  volumeMl: number;

  @Column({ name: 'data_coleta', type: 'timestamp' })
  dataColeta: Date;

  @ManyToOne(() => Nutriz, (nutriz) => nutriz.doacoes)
  @JoinColumn({ name: 'nutriz_id' })
  nutriz: Nutriz;

  @OneToOne(() => Agendamento, (agendamento) => agendamento.doacao)
  @JoinColumn({ name: 'agendamento_id' })
  agendamento: Agendamento;
}
