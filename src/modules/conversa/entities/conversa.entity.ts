import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Nutriz } from '../../nutriz/entities/nutriz.entity';
import { Mensagem } from '../../mensagem/entities/mensagem.entity';

export enum ConversaStatus {
  ABERTA = 'aberta',
  ENCERRADA = 'encerrada',
  ENCAMINHADA_HUMANO = 'encaminhada_humano',
}

export enum ConversaCanal {
  APP = 'app',
  WHATSAPP = 'whatsapp',
}

@Entity('conversas')
export class Conversa {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'data_inicio' })
  dataInicio: Date;

  @Column({
    type: 'varchar',
    default: ConversaStatus.ABERTA,
  })
  status: ConversaStatus;

  @Column({
    type: 'varchar',
    default: ConversaCanal.APP,
  })
  canal: ConversaCanal;

  @ManyToOne(() => Nutriz, (nutriz) => nutriz.conversas)
  @JoinColumn({ name: 'nutriz_id' })
  nutriz: Nutriz;

  @OneToMany(() => Mensagem, (mensagem) => mensagem.conversa)
  mensagens: Mensagem[];
}
