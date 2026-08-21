import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FeedbackFaq } from '../../feedback-faq/entities/feedback-faq.entity';

@Entity('perguntas_frequentes')
export class PerguntaFrequente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  categoria: string;

  @Column({ length: 255 })
  pergunta: string;

  @Column({ type: 'clob' })
  resposta: string;

  @Column({ type: 'int', default: 0 })
  ordem: number;

  @OneToMany(() => FeedbackFaq, (feedback) => feedback.pergunta)
  feedbacks: FeedbackFaq[];
}
