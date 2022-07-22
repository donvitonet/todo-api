import { Body, Controller, HttpCode, Post, Version } from '@nestjs/common';
import CreateTaskInteractor from 'src/use-cases/tasks/create-task/create-task.interactor';
import { CreateTaskRequestDTO } from '../validation/create-task-request.dto';
import { CreateTaskResponseDTO } from '../presentation/create-task-response.dto';

@Controller('task')
export class TasksController {
  constructor(private createTaskInteractor: CreateTaskInteractor) {}

  @Version('1')
  @HttpCode(200)
  @Post()
  async create(
    @Body() input: CreateTaskRequestDTO,
  ): Promise<CreateTaskResponseDTO> {
    const task = await this.createTaskInteractor.execute(input);

    return {
      data: {
        id: Number(task.id.toValue()),
        name: task.name,
      },
    };
  }
}
