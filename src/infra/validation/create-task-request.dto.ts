import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskRequestDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
