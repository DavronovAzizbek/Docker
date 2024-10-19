import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post()
  async create(@Body() dto: CreateAnalyticsDto) {
    const analytics = await this.analyticsService.create(dto);
    return {
      message: 'Analytics successfully created ✅',
      analytics,
    };
  }

  @Get()
  async findAll() {
    const analyticsList = await this.analyticsService.findAll();
    return {
      message: 'Analytics retrieved successfully ✅',
      analytics: analyticsList,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const analytics = await this.analyticsService.findOne(id);
    return {
      message: 'Analytics retrieved successfully ✅',
      analytics,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateAnalyticsDto) {
    const updatedAnalytics = await this.analyticsService.update(id, dto);
    return {
      message: 'Analytics successfully updated ✅',
      analytics: updatedAnalytics,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.analyticsService.remove(id);
    return {
      message: 'Analytics successfully deleted ✅',
    };
  }
}
