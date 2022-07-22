import { Inject } from '@nestjs/common';
import { Task } from '@entities';
import { Tasks } from '@useCases';
import { MemoryTaskMapper } from 'src/infra/mappers/memory-task.mapper';

export class FindAllTaskImpl implements Tasks.FindAllTasks.FindAllTasksGateway {
  constructor(
    @Inject('MemoryTaskMapper')
    private _taskRepository: MemoryTaskMapper,
  ) {}

  findAllTasks(): Promise<Task[]> {
    return this._taskRepository.findAll();
  }
}
