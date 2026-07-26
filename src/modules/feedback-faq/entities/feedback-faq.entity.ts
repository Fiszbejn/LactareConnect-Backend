import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { PerguntaFrequente } from '../../pergunta-frequente/entities/pergunta-frequente.entity';
import { Nutriz } from '../../nutriz/entities/nutriz.entity';

@Entity('feedbacks_faq')
export class FeedbackFaq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  util: boolean;

  @CreateDateColumn({ name: 'data' })
  data: Date;

  @ManyToOne(() => PerguntaFrequente, (pergunta) => pergunta.feedbacks)
  @JoinColumn({ name: 'pergunta_id' })
  pergunta: PerguntaFrequente;

  @ManyToOne(() => Nutriz, (nutriz) => nutriz.feedbacksFaq)
  @JoinColumn({ name: 'nutriz_id' })
  nutriz: Nutriz;
}
