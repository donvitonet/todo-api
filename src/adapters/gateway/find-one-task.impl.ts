import { Inject } from '@nestjs/common';
import { Task } from '@entities';
import { Tasks } from '@useCases';
import { MemoryTaskMapper } from 'src/infra/mappers/memory-task.mapper';

export class FindOneTaskImpl implements Tasks.FindOneTask.FindOneTaskGateway {
  constructor(
    @Inject('MemoryTaskMapper')
    private _taskRepository: MemoryTaskMapper,
  ) {}

  findOneById(id: number): Promise<Task> {
    return this._taskRepository.findOneById(id);
  }
}
