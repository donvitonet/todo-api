import { Task } from '@entities';

export interface CompleteTaskGateway {
  findOneById(id: number): Promise<Task | null>;
  updateTask(task: Task): Promise<void>;
}
