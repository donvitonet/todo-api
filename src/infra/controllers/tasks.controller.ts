import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Version,
} from '@nestjs/common';
import { Tasks } from '@useCases';
import { Presentation } from '@infra';
import { Task } from '@entities';
import { CreateTaskRequestDTO, UpdateTaskRequestDTO } from '../validation';

@Controller('task')
export class TasksController {
  constructor(
    private _createTaskInteractor: Tasks.CreateTask.CreateTaskInteractor,
    private _findAllTasksInteractor: Tasks.FindAllTasks.FindAllTasksInteractor,
    private _findOneInteractor: Tasks.FindOneTask.FindOneTaskInteractor,
    private _updateInteractor: Tasks.UpdateTask.UpdateTaskInteractor,
    private _deleteInteractor: Tasks.DeleteTask.DeleteTaskInteractor,
  ) {}

  @Version('1')
  @HttpCode(200)
  @Post()
  async create(
    @Body() body: CreateTaskRequestDTO,
  ): Promise<Presentation.CreateTaskResponseDTO> {
    const task = await this._createTaskInteractor.execute(body);
    return {
      data: this._mapToPresentation(task),
    };
  }

  @Version('1')
  @Get()
  async findAll(): Promise<Presentation.FindAllTasksResponseDTO> {
    const tasks = await this._findAllTasksInteractor.execute();

    return {
      data: tasks.map((t) => this._mapToPresentation(t)),
    };
  }

  @Version('1')
  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<Presentation.FindOneTaskResponseDTO> {
    const task = await this._findOneInteractor.execute({
      id,
    });

    if (!task) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return {
      data: {
        ...this._mapToPresentation(task),
      },
    };
  }

  @Version('1')
  @HttpCode(204)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateTaskRequestDTO,
  ): Promise<void> {
    await this._updateInteractor.execute({
      id,
      name: payload.name,
    });
  }

  @Version('1')
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this._deleteInteractor.execute({
      id,
    });
  }

  _mapToPresentation({ id, name, done }: Task) {
    return {
      id: Number(id.toValue()),
      name,
      done,
    };
  }
}
