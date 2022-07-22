import { Inject, Injectable } from '@nestjs/common';
import { Tasks } from '@useCases';

@Injectable()
export default class CreateTaskInteractor {
  constructor(
    @Inject('CreateTaskGateway')
    private gateway: Tasks.CreateTask.CreateTaskGateway,
  ) {}

  async execute(input: Tasks.CreateTask.CreateTaskInputDTO) {
    return await this.gateway.createTask(input);
  }
}
