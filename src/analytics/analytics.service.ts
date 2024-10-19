import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analytics } from './entities/analytics.entity';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Analytics) private analyticsRepo: Repository<Analytics>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateAnalyticsDto): Promise<Analytics> {
    const product = await this.productRepo.findOne({
      where: { id: dto.productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${dto.productId} not found`);
    }

    const analytics = this.analyticsRepo.create({ ...dto, product });
    return this.analyticsRepo.save(analytics);
  }

  async findAll(): Promise<Analytics[]> {
    return this.analyticsRepo.find();
  }

  async findOne(id: number): Promise<Analytics> {
    const analytics = await this.analyticsRepo.findOne({ where: { id } });
    if (!analytics) {
      throw new NotFoundException(`Analytics with ID ${id} not found`);
    }
    return analytics;
  }

  async update(id: number, dto: UpdateAnalyticsDto): Promise<Analytics> {
    const analytics = await this.analyticsRepo.findOne({ where: { id } });
    if (!analytics) {
      throw new NotFoundException(`Analytics with ID ${id} not found`);
    }

    const product = dto.productId
      ? await this.productRepo.findOne({ where: { id: dto.productId } })
      : null;
    if (dto.productId && !product) {
      throw new NotFoundException(`Product with ID ${dto.productId} not found`);
    }

    Object.assign(analytics, dto, { product });
    return this.analyticsRepo.save(analytics);
  }

  async remove(id: number): Promise<void> {
    const result = await this.analyticsRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Analytics with ID ${id} not found`);
    }
  }
}
