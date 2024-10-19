import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    const order = await this.ordersService.create(dto);
    return {
      message: 'Order successfully created ✅',
      order,
    };
  }

  @Get()
  async findAll() {
    const orders = await this.ordersService.findAll();
    return {
      message: 'Orders retrieved successfully ✅',
      orders,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const order = await this.ordersService.findOne(id);
    return {
      message: 'Order retrieved successfully ✅',
      order,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateOrderDto) {
    const updatedOrder = await this.ordersService.update(id, dto);
    return {
      message: 'Order successfully updated ✅',
      order: updatedOrder,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.ordersService.remove(id);
    return {
      message: 'Order successfully deleted ✅',
    };
  }
}
