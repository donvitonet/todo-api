import { Inject, Injectable } from '@nestjs/common';
import { Tasks } from '@useCases';

@Injectable()
export class CompleteTaskInteractor {
  constructor(
    @Inject('CompleteTaskGateway')
    private _gateway: Tasks.CompleteTask.CompleteTaskGateway,
  ) {}

  async execute(input: Tasks.CompleteTask.CompleteTaskInputDTO): Promise<void> {
    const task = await this._gateway.findOneById(input.id);
    if (!task) {
      throw new Error('Not found');
    }

    task.complete();

    await this._gateway.updateTask(task);
  }
}
