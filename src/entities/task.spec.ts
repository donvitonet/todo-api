import { Task, UniqueEntityID } from '@entities';

describe('Task Entity', () => {
  describe('new task', () => {
    it('should create new task', () => {
      const task = Task.build(
        {
          name: 'remember the milk',
          done: false,
        },
        new UniqueEntityID('new'),
      ).value;

      expect(task.done).toBe(false);
    });
  });

  describe('complete task', () => {
    it('should complete a task', () => {
      const task = Task.build(
        {
          name: 'remember the milk',
          done: false,
        },
        new UniqueEntityID(1),
      ).value;

      task.complete();
      expect(task.done).toBe(true);
    });
  });
});
