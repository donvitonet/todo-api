import { Task, UniqueEntityID } from '@entities';
import { Tasks } from '@useCases';
import { TasksController } from './tasks.controller';

function buildTaskEntity({ id, name }) {
  return Task.build(
    {
      name,
    },
    new UniqueEntityID(id),
  ).value;
}

function mapTaskEntityToPresentation(task: Task) {
  return {
    id: Number(task.id.toValue()),
    name: task.name,
    done: task.done,
  };
}

describe('TasksController', () => {
  let controller: TasksController;
  let completeTaskInteractor: Tasks.CompleteTask.CompleteTaskInteractor;
  let createTaskInteractor: Tasks.CreateTask.CreateTaskInteractor;
  let findAllTasksInteractor: Tasks.FindAllTasks.FindAllTasksInteractor;

  beforeEach(async () => {
    completeTaskInteractor = new Tasks.CompleteTask.CompleteTaskInteractor(
      null,
    );
    createTaskInteractor = new Tasks.CreateTask.CreateTaskInteractor(null);

    findAllTasksInteractor = new Tasks.FindAllTasks.FindAllTasksInteractor(
      null,
    );

    controller = new TasksController(
      completeTaskInteractor,
      createTaskInteractor,
      null,
      findAllTasksInteractor,
      null,
      null,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the task created', async () => {
    const newTask = buildTaskEntity({ id: 1, name: 'the task created' });

    jest
      .spyOn(createTaskInteractor, 'execute')
      .mockImplementation(() => Promise.resolve(newTask));

    expect(
      await controller.create({
        name: 'the task created',
      }),
    ).toEqual({
      data: mapTaskEntityToPresentation(newTask),
    });
  });

  it('should return a list of tasks empty', async () => {
    jest
      .spyOn(findAllTasksInteractor, 'execute')
      .mockImplementation(() => Promise.resolve([]));

    expect(await controller.findAll()).toEqual({ data: [] });
  });

  it('should return a list of task with tasks', async () => {
    const t1 = buildTaskEntity({ id: 1, name: 'the task #1' });
    const t2 = buildTaskEntity({ id: 2, name: 'the task #2' });

    jest
      .spyOn(findAllTasksInteractor, 'execute')
      .mockImplementation(() => Promise.resolve([t1, t2]));

    expect(await controller.findAll()).toEqual({
      data: [t1, t2].map((t) => mapTaskEntityToPresentation(t)),
    });
  });
});
