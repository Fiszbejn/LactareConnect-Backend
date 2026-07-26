import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Nutriz } from '../../nutriz/entities/nutriz.entity';

@Entity('enderecos')
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 9 })
  cep: string;

  @Column({ length: 150 })
  rua: string;

  @Column({ length: 20 })
  numero: string;

  @Column({ length: 100 })
  bairro: string;

  @Column({ length: 100 })
  cidade: string;

  @Column({ length: 2 })
  uf: string;

  @OneToOne(() => Nutriz, (nutriz) => nutriz.endereco)
  @JoinColumn({ name: 'nutriz_id' })
  nutriz: Nutriz;
}
