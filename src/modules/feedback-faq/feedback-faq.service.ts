import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FeedbackFaq } from './entities/feedback-faq.entity';
import { PerguntaFrequente } from '../pergunta-frequente/entities/pergunta-frequente.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { CreateFeedbackFaqDto } from './dto/create-feedback-faq.dto';

@Injectable()
export class FeedbackFaqService {
  constructor(
    @InjectRepository(FeedbackFaq)
    private readonly feedbackRepository: Repository<FeedbackFaq>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(createFeedbackDto: CreateFeedbackFaqDto): Promise<FeedbackFaq> {
    const { perguntaId, nutrizId, ...dados } = createFeedbackDto;

    const pergunta = await this.dataSource
      .getRepository(PerguntaFrequente)
      .findOneBy({ id: perguntaId });
    if (!pergunta) {
      throw new NotFoundException(
        `Pergunta frequente #${perguntaId} não encontrada`,
      );
    }
    const nutriz = await this.dataSource
      .getRepository(Nutriz)
      .findOneBy({ id: nutrizId });
    if (!nutriz) {
      throw new NotFoundException(`Nutriz #${nutrizId} não encontrada`);
    }

    const feedback = this.feedbackRepository.create({
      ...dados,
      pergunta,
      nutriz,
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
