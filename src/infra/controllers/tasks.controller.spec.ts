import { Task, UniqueEntityID } from '@entities';
import { Tasks } from '@useCases';
import { TasksController } from './tasks.controller';

describe('TasksController', () => {
  let controller: TasksController;
  let completeTaskInteractor: Tasks.CompleteTask.CompleteTaskInteractor;
  let createTaskInteractor: Tasks.CreateTask.CreateTaskInteractor;

  beforeEach(async () => {
    completeTaskInteractor = new Tasks.CompleteTask.CompleteTaskInteractor(
      null,
    );
    createTaskInteractor = new Tasks.CreateTask.CreateTaskInteractor(null);

    controller = new TasksController(
      completeTaskInteractor,
      createTaskInteractor,
      null,
      null,
      null,
      null,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the task created', async () => {
    const task = Task.build(
      {
        name: 'the task created',
      },
      new UniqueEntityID(1),
    ).value;

    jest
      .spyOn(createTaskInteractor, 'execute')
      .mockImplementation(() => Promise.resolve(task));

    expect(
      await controller.create({
        name: 'the task created',
      }),
    ).toEqual({
      data: {
        id: 1,
        name: 'the task created',
        done: false,
      },
    });
  });
});
