import { Inject, Injectable } from '@nestjs/common';
import { Tasks } from '@useCases';

@Injectable()
export class DeleteTaskInteractor {
  constructor(
    @Inject('DeleteTaskGateway')
    private _gateway: Tasks.DeleteTask.DeleteTaskGateway,
  ) {}

  async execute(input: Tasks.DeleteTask.DeleteTaskInputDTO): Promise<void> {
    const task = await this._gateway.findOneById(input.id);
    if (!task) {
      throw new Error('Not found');
    }

    await this._gateway.deleteTask(task);
  }
}
