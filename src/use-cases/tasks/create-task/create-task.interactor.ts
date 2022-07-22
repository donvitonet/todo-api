import { Inject, Injectable } from '@nestjs/common';
import { Tasks } from '@useCases';

@Injectable()
export class CreateTaskInteractor {
  constructor(
    @Inject('CreateTaskGateway')
    private _gateway: Tasks.CreateTask.CreateTaskGateway,
  ) {}

  async execute(input: Tasks.CreateTask.CreateTaskInputDTO) {
    return await this._gateway.createTask(input);
  }
}
