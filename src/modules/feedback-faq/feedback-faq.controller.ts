import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { FeedbackFaqService } from './feedback-faq.service';
import { CreateFeedbackFaqDto } from './dto/create-feedback-faq.dto';

@Controller('feedbacks-faq')
export class FeedbackFaqController {
  constructor(private readonly feedbackFaqService: FeedbackFaqService) {}

  @Post()
  create(@Body() createFeedbackFaqDto: CreateFeedbackFaqDto) {
    return this.feedbackFaqService.create(createFeedbackFaqDto);
  }

  @Get()
  findAll() {
    return this.feedbackFaqService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.feedbackFaqService.findOne(id);
  }
}
