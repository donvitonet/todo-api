export class ApplicationError extends Error {
  extra: unknown;
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
    this.message = message;
  }
}

export class TaskAlreadyDoneError extends ApplicationError {
  constructor() {
    super('task_already_error', 'Task already done error!');
  }
}
