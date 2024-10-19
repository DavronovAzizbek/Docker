import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Entity('analytics')
export class Analytics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  metric: string;

  @Column('float')
  value: number;

  @ManyToOne(() => Product, (product) => product.analytics)
  product: Product;

  @Column({ nullable: true })
  productId: number;
}
