import { Inject } from '@nestjs/common';
import { Task } from '@entities';
import { Tasks } from '@useCases';
import { MemoryTaskMapper } from 'src/infra/mappers/memory-task.mapper';

export class CompleteTaskImpl
  implements Tasks.CompleteTask.CompleteTaskGateway
{
  constructor(
    @Inject('MemoryTaskMapper')
    private _taskRepository: MemoryTaskMapper,
  ) {}

  async findOneById(id: number): Promise<Task> {
    return await this._taskRepository.findOneById(id);
  }

  async updateTask(task: Task): Promise<void> {
    await this._taskRepository.update(task);
  }
}
