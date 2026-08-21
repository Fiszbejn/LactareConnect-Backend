import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Resgate } from '../../resgate/entities/resgate.entity';

@Entity('recompensas')
export class Recompensa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nome: string;

  @Column({ length: 150 })
  parceiro: string;

  @Column({ length: 50 })
  categoria: string;

  @Column({ name: 'custo_gotinhas', type: 'int' })
  custoGotinhas: number;

  @Column({ type: 'int', default: 0 })
  estoque: number;

  @Column({ default: true })
  ativo: boolean;

  @Column({ name: 'imagem_url', length: 500, nullable: true })
  imagemUrl: string;

  @OneToMany(() => Resgate, (resgate) => resgate.recompensa)
  resgates: Resgate[];
}
