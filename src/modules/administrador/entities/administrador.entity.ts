import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BancoLeiteLactare } from '../../banco-leite/entities/banco-leite.entity';
import { RelatorioGerado } from '../../relatorio-gerado/entities/relatorio-gerado.entity';

@Entity('administradores')
export class Administrador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nome: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ name: 'senha_hash', length: 255 })
  senhaHash: string;

  @Column({ length: 50 })
  papel: string;

  @ManyToOne(() => BancoLeiteLactare, (banco) => banco.administradores, {
    nullable: true,
  })
  @JoinColumn({ name: 'banco_vinculado_id' })
  bancoVinculado: BancoLeiteLactare;

  @OneToMany(() => RelatorioGerado, (relatorio) => relatorio.administrador)
  relatoriosGerados: RelatorioGerado[];
}
