import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Endereco } from '../../endereco/entities/endereco.entity';
import { PreferenciasUsuario } from '../../preferencias-usuario/entities/preferencias-usuario.entity';
import { ExamePreDoacao } from '../../exame-pre-doacao/entities/exame-pre-doacao.entity';
import { Agendamento } from '../../agendamento/entities/agendamento.entity';
import { Doacao } from '../../doacao/entities/doacao.entity';
import { TransacaoGotinhas } from '../../transacao-gotinhas/entities/transacao-gotinhas.entity';
import { Resgate } from '../../resgate/entities/resgate.entity';
import { FeedbackFaq } from '../../feedback-faq/entities/feedback-faq.entity';
import { Conversa } from '../../conversa/entities/conversa.entity';

export enum NutrizStatus {
  PENDENTE = 'pendente',
  APROVADA = 'aprovada',
  INATIVA = 'inativa',
}

@Entity('nutrizes')
export class Nutriz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nome: string;

  @Column({ length: 14, unique: true })
  cpf: string;

  @Column({ name: 'data_nascimento', type: 'date' })
  dataNascimento: Date;

  @Column({ length: 20 })
  telefone: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ name: 'senha_hash', length: 255 })
  senhaHash: string;

  @Column({ type: 'varchar', default: NutrizStatus.PENDENTE })
  status: NutrizStatus;

  @CreateDateColumn({ name: 'data_cadastro' })
  dataCadastro: Date;

  @OneToOne(() => Endereco, (endereco) => endereco.nutriz)
  endereco: Endereco;

  @OneToOne(() => PreferenciasUsuario, (preferencias) => preferencias.nutriz)
  preferencias: PreferenciasUsuario;

  @OneToMany(() => ExamePreDoacao, (exame) => exame.nutriz)
  examesPreDoacao: ExamePreDoacao[];

  @OneToMany(() => Agendamento, (agendamento) => agendamento.nutriz)
  agendamentos: Agendamento[];

  @OneToMany(() => Doacao, (doacao) => doacao.nutriz)
  doacoes: Doacao[];

  @OneToMany(() => TransacaoGotinhas, (transacao) => transacao.nutriz)
  transacoesGotinhas: TransacaoGotinhas[];

  @OneToMany(() => Resgate, (resgate) => resgate.nutriz)
  resgates: Resgate[];

  @OneToMany(() => FeedbackFaq, (feedback) => feedback.nutriz)
  feedbacksFaq: FeedbackFaq[];

  @OneToMany(() => Conversa, (conversa) => conversa.nutriz)
  conversas: Conversa[];
}
