import { Task } from '@entities';

export interface DeleteTaskGateway {
  findOneById(id: number): Promise<Task | null>;
  deleteTask(task: Task): Promise<void>;
}
