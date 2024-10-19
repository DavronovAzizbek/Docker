import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { Category } from './category/entities/category.entity';
import { CategoriesModule } from './category/category.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrdersModule } from './orders/orders.module';
import { ServicesModule } from './services/services.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { UsersModule } from './users/users.module';
import { Review } from './reviews/entities/review.entity';
import { Order } from './orders/entities/order.entity';
import { Service } from './services/entities/service.entity';
import { Analytics } from './analytics/entities/analytics.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Product, Category, Review, Order, Service, Analytics, User],
      synchronize: true,
    }),
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
    }),
    ProductsModule,
    CategoriesModule,
    ReviewsModule,
    OrdersModule,
    ServicesModule,
    AnalyticsModule,
    UsersModule,
  ],
})
export class AppModule {}
