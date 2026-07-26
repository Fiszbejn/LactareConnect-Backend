import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedbackFaq } from './entities/feedback-faq.entity';
import { PerguntaFrequente } from '../pergunta-frequente/entities/pergunta-frequente.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { CreateFeedbackFaqDto } from './dto/create-feedback-faq.dto';

@Injectable()
export class FeedbackFaqService {
  constructor(
    @InjectRepository(FeedbackFaq)
    private readonly feedbackRepository: Repository<FeedbackFaq>,
  ) {}

  create(createFeedbackDto: CreateFeedbackFaqDto): Promise<FeedbackFaq> {
    const { perguntaId, nutrizId, ...dados } = createFeedbackDto;
    const feedback = this.feedbackRepository.create({
      ...dados,
      pergunta: { id: perguntaId } as PerguntaFrequente,
      nutriz: { id: nutrizId } as Nutriz,
    });
    return this.feedbackRepository.save(feedback);
  }

  findAll(): Promise<FeedbackFaq[]> {
    return this.feedbackRepository.find({
      relations: { pergunta: true, nutriz: true },
    });
  }

  async findOne(id: number): Promise<FeedbackFaq> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: { pergunta: true, nutriz: true },
    });
    if (!feedback) {
      throw new NotFoundException(`Feedback de FAQ #${id} não encontrado`);
    }
    return feedback;
  }
}
