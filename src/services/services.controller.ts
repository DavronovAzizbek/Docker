import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async create(@Body() dto: CreateServiceDto) {
    const service = await this.servicesService.create(dto);
    return {
      message: 'Service successfully created ✅',
      service,
    };
  }

  @Get()
  async findAll() {
    const services = await this.servicesService.findAll();
    return {
      message: 'Services retrieved successfully ✅',
      services,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const service = await this.servicesService.findOne(id);
    return {
      message: 'Service retrieved successfully ✅',
      service,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateServiceDto) {
    const updatedService = await this.servicesService.update(id, dto);
    return {
      message: 'Service successfully updated ✅',
      service: updatedService,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.servicesService.remove(id);
    return {
      message: 'Service successfully deleted ✅',
    };
  }
}
