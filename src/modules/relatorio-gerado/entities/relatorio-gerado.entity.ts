import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Administrador } from '../../administrador/entities/administrador.entity';

export enum RelatorioFormato {
  PDF_COMPLETO = 'pdf_completo',
  PDF_RESUMO = 'pdf_resumo',
  CSV = 'csv',
}

@Entity('relatorios_gerados')
export class RelatorioGerado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'periodo_inicio', type: 'date' })
  periodoInicio: Date;

  @Column({ name: 'periodo_fim', type: 'date' })
  periodoFim: Date;

  @Column({ name: 'secoes_incluidas', type: 'clob' })
  secoesIncluidas: string;

  @Column({ type: 'varchar' })
  formato: RelatorioFormato;

  @Column({ name: 'arquivo_url', length: 500, nullable: true })
  arquivoUrl: string;

  @CreateDateColumn({ name: 'data_geracao' })
  dataGeracao: Date;

  @ManyToOne(
    () => Administrador,
    (administrador) => administrador.relatoriosGerados,
  )
  @JoinColumn({ name: 'administrador_id' })
  administrador: Administrador;
}
