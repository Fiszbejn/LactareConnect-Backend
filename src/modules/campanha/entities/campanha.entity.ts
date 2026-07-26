import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum CampanhaCanal {
  EMAIL = 'email',
  PUSH = 'push',
  SMS = 'sms',
  WHATSAPP = 'whatsapp',
  INAPP = 'inapp',
}

@Entity('campanhas')
export class Campanha {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nome: string;

  @Column({ type: 'varchar' })
  canal: CampanhaCanal;

  @Column({ type: 'int', default: 0 })
  enviados: number;

  @Column({ type: 'int', default: 0 })
  aberturas: number;

  @Column({ type: 'int', default: 0 })
  cliques: number;

  @Column({ name: 'data_envio', type: 'timestamp' })
  dataEnvio: Date;
}
