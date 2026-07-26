import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Agendamento } from '../../agendamento/entities/agendamento.entity';
import { Administrador } from '../../administrador/entities/administrador.entity';

@Entity('bancos_leite')
export class BancoLeiteLactare {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nome: string;

  @Column({ name: 'endereco_texto', length: 255 })
  enderecoTexto: string;

  @Column({ name: 'area_atendimento', length: 255 })
  areaAtendimento: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  @OneToMany(() => Agendamento, (agendamento) => agendamento.banco)
  agendamentos: Agendamento[];

  @OneToMany(
    () => Administrador,
    (administrador) => administrador.bancoVinculado,
  )
  administradores: Administrador[];
}
