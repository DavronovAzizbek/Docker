import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    const review = await this.reviewsService.create(createReviewDto);
    return {
      message: 'Review successfully created ✅',
      review: {
        id: review.id,
        comment: review.comment,
        rating: review.rating,
        product: review.product,
      },
    };
  }

  @Get()
  async findAll() {
    const reviews = await this.reviewsService.findAll();
    return {
      message: 'Reviews retrieved successfully ✅',
      reviews,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const review = await this.reviewsService.findOne(id);
    return {
      message: 'Review retrieved successfully ✅',
      review,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const updatedReview = await this.reviewsService.update(id, updateReviewDto);
    return {
      message: 'Review successfully updated ✅',
      review: updatedReview,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.reviewsService.remove(id);
    return {
      message: 'Review successfully deleted ✅',
    };
  }
}
