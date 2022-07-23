import { Task, UniqueEntityID } from '@entities';
import { Common } from '@adapters';

interface TaskModel {
  id: number;
  name: string;
  done: boolean;
}

export class MemoryTaskMapper implements Common.IDataMapper {
  private tasks: TaskModel[] = [];

  async insert(e: Task): Promise<Task> {
    const generatedId = this._generateNextId();
    this.tasks.push(this.toPersist(e, generatedId));

    return this.toDomain(this.tasks.find((t) => t.id === generatedId));
  }

  async findAll(): Promise<Task[]> {
    return this.tasks.map((t) => this.toDomain(t));
  }

  async findOneById(id: number): Promise<Task> {
    const task = this.tasks.find((t) => t.id === Number(id));
    if (task) {
      return this.toDomain(task);
    }

    return null;
  }

  _generateNextId() {
    return this.tasks.length + 1;
  }

  toPersist(task: Task, id?: number): TaskModel {
    return {
      id: id || Number(task.id.toValue()),
      name: task.name,
      done: task.done,
    };
  }

  toDomain(taskModel: TaskModel): Task {
    return Task.build(
      {
        name: taskModel.name,
        done: taskModel.done,
      },
      new UniqueEntityID(taskModel.id),
    ).value;
  }
}
