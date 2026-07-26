import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Nutriz } from '../../nutriz/entities/nutriz.entity';

@Entity('preferencias_usuario')
export class PreferenciasUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'notificacoes_ativas', default: true })
  notificacoesAtivas: boolean;

  @Column({ length: 10, default: 'pt-BR' })
  idioma: string;

  @Column({ length: 10, default: 'claro' })
  tema: string;

  @OneToOne(() => Nutriz, (nutriz) => nutriz.preferencias)
  @JoinColumn({ name: 'nutriz_id' })
  nutriz: Nutriz;
}
