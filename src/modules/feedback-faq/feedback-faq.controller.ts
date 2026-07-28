import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FeedbackFaqService } from './feedback-faq.service';
import { CreateFeedbackFaqDto } from './dto/create-feedback-faq.dto';
import { UpdateFeedbackFaqDto } from './dto/update-feedback-faq.dto';
import { FeedbackFaqResponseDto } from './dto/feedback-faq-response.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';

@ApiTags('Feedback de FAQ')
@ApiBearerAuth('access-token')
@Controller('feedbacks-faq')
export class FeedbackFaqController {
  constructor(private readonly feedbackFaqService: FeedbackFaqService) {}

  @ApiOperation({
    summary: 'Registrar se uma pergunta do FAQ foi útil para a nutriz',
  })
  @ApiCreatedResponse({ type: FeedbackFaqResponseDto })
  @Post()
  create(
    @Body() createFeedbackFaqDto: CreateFeedbackFaqDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.feedbackFaqService.create(createFeedbackFaqDto, user);
  }

  @ApiOperation({
    summary:
      'Listar feedbacks de FAQ (nutriz vê só os próprios; administrador vê todos)',
  })
  @ApiOkResponse({ type: FeedbackFaqResponseDto, isArray: true })
  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.feedbackFaqService.findAll(user);
  }

  @ApiOperation({ summary: 'Buscar um feedback de FAQ pelo id' })
  @ApiOkResponse({ type: FeedbackFaqResponseDto })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.feedbackFaqService.findOne(id, user);
  }

  @ApiOperation({
    summary: 'Atualizar um feedback de FAQ (ex: mudar de útil para não útil)',
  })
  @ApiOkResponse({ type: FeedbackFaqResponseDto })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFeedbackFaqDto: UpdateFeedbackFaqDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.feedbackFaqService.update(id, updateFeedbackFaqDto, user);
  }
}
