import { Task } from '@entities';

export interface CreateTaskInputDTO {
  name: string;
}

export interface CreateTaskOutputDTO {
  success: boolean;
  task?: Task;
  failure?: {
    data: Error[];
  };
}
