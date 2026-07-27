import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Nutriz } from '../../nutriz/entities/nutriz.entity';

export enum ExameTipo {
  CARTEIRA_PRE_NATAL = 'carteira_pre_natal',
  HEMOGRAMA = 'hemograma',
  SOROLOGIAS = 'sorologias',
  HTLV = 'htlv',
  SOROLOGIA_HIV = 'sorologia_hiv',
  VDRL = 'vdrl',
  SOROLOGIA_HEPATITES_B_C = 'sorologia_hepatites_b_c',
}

export enum ExameStatus {
  OK = 'ok',
  PENDENTE = 'pendente',
  FALTANDO = 'faltando',
}

@Entity('exames_pre_doacao')
export class ExamePreDoacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tipo_exame', type: 'varchar' })
  tipoExame: ExameTipo;

  @Column({
    type: 'varchar',
    default: ExameStatus.FALTANDO,
  })
  status: ExameStatus;

  @Column({ name: 'arquivo_url', length: 500, nullable: true })
  arquivoUrl: string;

  @Column({ name: 'data_envio', type: 'timestamp', nullable: true })
  dataEnvio: Date;

  @ManyToOne(() => Nutriz, (nutriz) => nutriz.examesPreDoacao)
  @JoinColumn({ name: 'nutriz_id' })
  nutriz: Nutriz;
}
