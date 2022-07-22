import { Task } from '@entities';
import { CreateTaskRequestDTO } from 'src/infra/validation/create-task-request.dto';

export interface CreateTaskGateway {
  createTask(task: CreateTaskRequestDTO): Promise<Task>;
}
