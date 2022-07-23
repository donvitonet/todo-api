import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskRequestDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
