import { Task } from '@entities';

export interface FindOneTaskGateway {
  findOneById(id: number): Promise<Task | null>;
}
