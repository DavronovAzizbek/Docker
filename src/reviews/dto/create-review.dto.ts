import { IsString, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsInt()
  @IsPositive()
  rating: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  productId: number;
}
