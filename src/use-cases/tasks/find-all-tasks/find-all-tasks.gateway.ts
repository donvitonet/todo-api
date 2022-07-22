import { Task } from '@entities';

export interface FindAllTasksGateway {
  findAllTasks(): Promise<Task[]>;
}
