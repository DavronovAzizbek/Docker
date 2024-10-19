import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(name: string, description?: string) {
    const category = this.categoriesRepository.create({ name, description });
    return this.categoriesRepository.save(category);
  }

  findAll() {
    return this.categoriesRepository.find({ relations: ['products'] });
  }

  findOne(id: number) {
    return this.categoriesRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }
  async update(id: number, name: string, description?: string) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    Object.assign(category, { name, description });

    await this.categoriesRepository.save(category);

    return {
      message: 'Category successfully updated!',
      updatedCategory: category,
    };
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.categoriesRepository.delete(id);
  }
}
