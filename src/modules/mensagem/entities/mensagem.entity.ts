import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Conversa } from '../../conversa/entities/conversa.entity';

export enum MensagemRemetente {
  BOT = 'bot',
  USUARIO = 'usuario',
}

@Entity('mensagens')
export class Mensagem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  remetente: MensagemRemetente;

  @Column({ type: 'clob' })
  texto: string;

  @CreateDateColumn({ name: 'timestamp' })
  timestamp: Date;

  @Column({ name: 'intencao_detectada', length: 100, nullable: true })
  intencaoDetectada: string;

  @ManyToOne(() => Conversa, (conversa) => conversa.mensagens)
  @JoinColumn({ name: 'conversa_id' })
  conversa: Conversa;
}
