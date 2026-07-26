import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackFaq } from './entities/feedback-faq.entity';
import { FeedbackFaqService } from './feedback-faq.service';
import { FeedbackFaqController } from './feedback-faq.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackFaq])],
  controllers: [FeedbackFaqController],
  providers: [FeedbackFaqService],
  exports: [FeedbackFaqService],
})
export class FeedbackFaqModule {}
