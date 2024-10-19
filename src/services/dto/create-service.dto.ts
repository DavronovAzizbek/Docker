import { IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty({ message: 'Service name is required' })
  name: string;

  @IsNotEmpty({ message: 'Description is required' })
  description: string;
}
