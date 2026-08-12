import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { RegiaoAtendimento } from '../../regiao-atendimento/entities/regiao-atendimento.entity';
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

  @ManyToOne(() => RegiaoAtendimento, (regiao) => regiao.administradores, {
    nullable: true,
  })
  @JoinColumn({ name: 'regiao_atendimento_vinculada_id' })
  regiaoAtendimentoVinculada: RegiaoAtendimento;

  @OneToMany(() => RelatorioGerado, (relatorio) => relatorio.administrador)
  relatoriosGerados: RelatorioGerado[];
}
