import { Task } from '@entities';

export interface UpdateTaskGateway {
  findOneById(id: number): Promise<Task | null>;
  updateTask(task: Task): Promise<void>;
}
