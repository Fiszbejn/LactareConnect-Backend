import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FeedbackFaqService } from './feedback-faq.service';
import { CreateFeedbackFaqDto } from './dto/create-feedback-faq.dto';

@ApiTags('Feedback de FAQ')
@Controller('feedbacks-faq')
export class FeedbackFaqController {
  constructor(private readonly feedbackFaqService: FeedbackFaqService) {}

  @ApiOperation({
    summary: 'Registrar se uma pergunta do FAQ foi útil para a nutriz',
  })
  @Post()
  create(@Body() createFeedbackFaqDto: CreateFeedbackFaqDto) {
    return this.feedbackFaqService.create(createFeedbackFaqDto);
  }

  @ApiOperation({ summary: 'Listar todos os feedbacks de FAQ' })
  @Get()
  findAll() {
    return this.feedbackFaqService.findAll();
  }

  @ApiOperation({ summary: 'Buscar um feedback de FAQ pelo id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.feedbackFaqService.findOne(id);
  }
}
