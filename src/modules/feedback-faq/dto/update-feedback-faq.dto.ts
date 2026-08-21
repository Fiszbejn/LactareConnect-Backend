import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedbackFaqDto } from './create-feedback-faq.dto';

export class UpdateFeedbackFaqDto extends PartialType(CreateFeedbackFaqDto) {}
