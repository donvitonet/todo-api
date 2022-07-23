import { Inject, Injectable } from '@nestjs/common';
import { Tasks } from '@useCases';

@Injectable()
export class FindOneTaskInteractor {
  constructor(
    @Inject('FindOneTaskGateway')
    private _gateway: Tasks.FindOneTask.FindOneTaskGateway,
  ) {}

  async execute({ id }: Tasks.FindOneTask.FindOndeTaskInputDTO) {
    return await this._gateway.findOneById(id);
  }
}
