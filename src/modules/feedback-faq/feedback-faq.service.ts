import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FeedbackFaq } from './entities/feedback-faq.entity';
import { PerguntaFrequente } from '../pergunta-frequente/entities/pergunta-frequente.entity';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { CreateFeedbackFaqDto } from './dto/create-feedback-faq.dto';
import { UpdateFeedbackFaqDto } from './dto/update-feedback-faq.dto';
import { AuthUser } from '../auth/types/auth-user.type';
import {
  FeedbackFaqResponseDto,
  toFeedbackFaqResponseDto,
} from './dto/feedback-faq-response.dto';

@Injectable()
export class FeedbackFaqService {
  constructor(
    @InjectRepository(FeedbackFaq)
    private readonly feedbackRepository: Repository<FeedbackFaq>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createFeedbackDto: CreateFeedbackFaqDto,
    user: AuthUser,
  ): Promise<FeedbackFaqResponseDto> {
    const { perguntaId, nutrizId, ...dados } = createFeedbackDto;

    if (user.tipo === 'nutriz' && user.id !== nutrizId) {
      throw new ForbiddenException(
        'Você só pode enviar feedback em seu próprio nome.',
      );
    }

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
    return toFeedbackFaqResponseDto(
      await this.feedbackRepository.save(feedback),
    );
  }

  async findAll(user: AuthUser): Promise<FeedbackFaqResponseDto[]> {
    const where = user.tipo === 'nutriz' ? { nutriz: { id: user.id } } : {};
    const feedbacks = await this.feedbackRepository.find({
      where,
      relations: { pergunta: true, nutriz: true },
    });
    return feedbacks.map(toFeedbackFaqResponseDto);
  }

  private async buscarPorId(id: number, user: AuthUser): Promise<FeedbackFaq> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: { pergunta: true, nutriz: true },
    });
    if (!feedback) {
      throw new NotFoundException(`Feedback de FAQ #${id} não encontrado`);
    }
    if (user.tipo === 'nutriz' && user.id !== feedback.nutriz.id) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este feedback.',
      );
    }
    return feedback;
  }

  async findOne(id: number, user: AuthUser): Promise<FeedbackFaqResponseDto> {
    return toFeedbackFaqResponseDto(await this.buscarPorId(id, user));
  }

  async update(
    id: number,
    updateFeedbackDto: UpdateFeedbackFaqDto,
    user: AuthUser,
  ): Promise<FeedbackFaqResponseDto> {
    const feedback = await this.buscarPorId(id, user);
    const { perguntaId, nutrizId, ...dados } = updateFeedbackDto;
    Object.assign(feedback, dados);

    if (nutrizId && user.tipo === 'nutriz' && user.id !== nutrizId) {
      throw new ForbiddenException(
        'Você não pode transferir este feedback para outra nutriz.',
      );
    }
    if (nutrizId) {
      const nutriz = await this.dataSource
        .getRepository(Nutriz)
        .findOneBy({ id: nutrizId });
      if (!nutriz) {
        throw new NotFoundException(`Nutriz #${nutrizId} não encontrada`);
      }
      feedback.nutriz = nutriz;
    }
    if (perguntaId) {
      const pergunta = await this.dataSource
        .getRepository(PerguntaFrequente)
        .findOneBy({ id: perguntaId });
      if (!pergunta) {
        throw new NotFoundException(
          `Pergunta frequente #${perguntaId} não encontrada`,
        );
      }
      feedback.pergunta = pergunta;
    }
    return toFeedbackFaqResponseDto(
      await this.feedbackRepository.save(feedback),
    );
  }
}
