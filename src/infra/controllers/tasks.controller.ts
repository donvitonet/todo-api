import { Body, Controller, Get, HttpCode, Post, Version } from '@nestjs/common';
import { Tasks } from '@useCases';
import { Presentation, Validation } from '@infra';
import { CreateTaskRequestDTO } from '../validation/create-task-request.dto';

@Controller('task')
export class TasksController {
  constructor(
    private _createTaskInteractor: Tasks.CreateTask.CreateTaskInteractor,
    private _findAllTasksInteractor: Tasks.FindAllTasks.FindAllTasksInteractor,
  ) {}

  @Version('1')
  @HttpCode(200)
  @Post()
  async create(
    @Body() input: CreateTaskRequestDTO,
  ): Promise<Presentation.CreateTaskResponseDTO> {
    const { id, name, done } = await this._createTaskInteractor.execute(input);

    return {
      data: {
        id: Number(id.toValue()),
        name,
        done,
      },
    };
  }

  @Version('1')
  @Get()
  async findAll(): Promise<Presentation.FindAllTasksResponseDTO> {
    const tasks = await this._findAllTasksInteractor.execute();

    return {
      data: tasks.map(({ id, name, done }) => ({
        id: Number(id.toValue()),
        name,
        done,
      })),
    };
  }
}
