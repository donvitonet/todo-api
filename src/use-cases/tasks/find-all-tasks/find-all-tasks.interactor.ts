import { Inject, Injectable } from '@nestjs/common';
import { Tasks } from '@useCases';

@Injectable()
export class FindAllTasksInteractor {
  constructor(
    @Inject('FindAllTasksGateway')
    private _gateway: Tasks.FindAllTasks.FindAllTasksGateway,
  ) {}

  async execute() {
    return this._gateway.findAllTasks();
  }
}
