import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAnalyticsDto {
  @IsString()
  @IsNotEmpty()
  metric: string;

  @IsNumber()
  value: number;

  @IsNotEmpty()
  productId: number;
}
