import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  @IsNotEmpty()
  dueDate: Date;
}
