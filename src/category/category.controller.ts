import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './category.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() body: { name: string; description?: string }) {
    const { name, description } = body;
    const category = await this.categoriesService.create(name, description);
    return {
      message: 'Category successfully created ✅',
      category,
    };
  }

  @Get()
  async findAll() {
    const categories = await this.categoriesService.findAll();
    return {
      message: 'Categories retrieved successfully ✅',
      categories,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoriesService.findOne(+id);
    return {
      message: 'Category retrieved successfully ✅',
      category,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name: string; description?: string },
  ) {
    const { name, description } = body;
    const updatedCategory = await this.categoriesService.update(
      +id,
      name,
      description,
    );
    return {
      message: 'Category successfully updated ✅',
      category: updatedCategory,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoriesService.remove(+id);
    return {
      message: 'Category successfully deleted ✅',
    };
  }
}
