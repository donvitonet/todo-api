import { Entity, UniqueEntityID } from '@entities';
import { Errors } from '@shared';
import { Result } from '../shared/result';

export interface ITaskProps {
  id?: UniqueEntityID;
  name: string;
  done: boolean;
}

export class Task extends Entity<ITaskProps> {
  private constructor(props: ITaskProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static build(props: ITaskProps, id?: UniqueEntityID): Result<Task> {
    const errors: string[] = [];

    if (errors.length > 0) {
      return Result.fail<Task>(errors);
    }

    return Result.success<Task>(new Task(props, id));
  }

  get name(): string {
    return this.props.name;
  }

  get done(): boolean {
    return this.props.done;
  }

  complete(): void {
    if (this.done) {
      throw new Errors.TaskAlreadyDoneError();
    }

    this.props.done = true;
  }
}
