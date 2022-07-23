import { Task } from '@entities';
import { Validation } from '@infra';

export interface CreateTaskGateway {
  createTask(task: Validation.CreateTaskRequestDTO): Promise<Task>;
}
