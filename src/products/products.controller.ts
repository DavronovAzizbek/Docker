import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProductDto: CreateProductDto): Promise<{
    message: string;
    product: Product;
  }> {
    const product = await this.productsService.create(createProductDto);
    return {
      message: 'Mahsulot muvaffaqiyatli yaratildi ✅',
      product,
    };
  }

  @Get()
  async findAll(): Promise<{
    message: string;
    products: Product[];
  }> {
    const products = await this.productsService.findAll();
    return {
      message: 'Barcha mahsulotlar 🛒',
      products,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<{
    message: string;
    product: Product;
  }> {
    const product = await this.productsService.findOne(id);
    return {
      message: "Mahsulot muvaffaqiyatli ko'rsatildi ✅",
      product,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: Partial<CreateProductDto>,
  ): Promise<{
    message: string;
    product: Product;
  }> {
    const updatedProduct = await this.productsService.update(
      id,
      updateProductDto,
    );
    return {
      message: 'Mahsulot muvaffaqiyatli yangilandi ✅',
      product: updatedProduct,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{
    message: string;
  }> {
    await this.productsService.remove(id);
    return {
      message: "Mahsulot muvaffaqiyatli o'chirildi ✅",
    };
  }
}
