import { Task } from '@entities';
import { Inject, Injectable } from '@nestjs/common';
import { Tasks } from '@useCases';

@Injectable()
export class UpdateTaskInteractor {
  constructor(
    @Inject('UpdateTaskGateway')
    private _gateway: Tasks.UpdateTask.UpdateTaskGateway,
  ) {}

  async execute(input: Tasks.UpdateTask.UpdateTaskInputDTO): Promise<void> {
    const task = await this._gateway.findOneById(input.id);
    if (!task) {
      throw new Error('Not found');
    }

    await this._gateway.updateTask(
      Task.build(
        {
          name: input.name,
          done: task.done,
        },
        task.id,
      ).value,
    );
  }
}
