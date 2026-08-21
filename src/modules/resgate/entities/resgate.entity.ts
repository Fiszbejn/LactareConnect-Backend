import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Nutriz } from '../../nutriz/entities/nutriz.entity';
import { Recompensa } from '../../recompensa/entities/recompensa.entity';

export enum ResgateStatus {
  PENDENTE = 'pendente',
  ENVIADO = 'enviado',
  CONCLUIDO = 'concluido',
}

@Entity('resgates')
export class Resgate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    default: ResgateStatus.PENDENTE,
  })
  status: ResgateStatus;

  @Column({ name: 'endereco_entrega', length: 255, nullable: true })
  enderecoEntrega: string;

  @CreateDateColumn({ name: 'data' })
  data: Date;

  @ManyToOne(() => Nutriz, (nutriz) => nutriz.resgates)
  @JoinColumn({ name: 'nutriz_id' })
  nutriz: Nutriz;

  @ManyToOne(() => Recompensa, (recompensa) => recompensa.resgates)
  @JoinColumn({ name: 'recompensa_id' })
  recompensa: Recompensa;
}
