import { Task } from '@entities';
import { Inject } from '@nestjs/common';
import { Tasks } from '@useCases';
import { MemoryTaskMapper } from 'src/infra/mappers/memory-task.mapper';
import { CreateTaskRequestDTO } from 'src/infra/validation/create-task-request.dto';

export default class CreateTaskImpl
  implements Tasks.CreateTask.CreateTaskGateway
{
  constructor(
    @Inject('MemoryTaskMapper')
    private _taskRepository: MemoryTaskMapper,
  ) {}

  async createTask({ name }: CreateTaskRequestDTO): Promise<Task> {
    return await this._taskRepository.insert(
      Task.build({
        name: name,
      }).value,
    );
  }
}
