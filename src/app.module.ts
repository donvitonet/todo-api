import { Module } from '@nestjs/common';
import { Tasks } from '@useCases';
import { Gateways } from '@adapters';
import { Controller, Mapper } from '@infra';

@Module({
  imports: [],
  controllers: [Controller.TasksController],
  providers: [
    Tasks.CreateTask.CreateTaskInteractor,
    Tasks.FindAllTasks.FindAllTasksInteractor,
    Tasks.FindOneTask.FindOneTaskInteractor,
    Tasks.UpdateTask.UpdateTaskInteractor,
    {
      provide: 'CreateTaskGateway',
      useClass: Gateways.CreateTaskImpl,
    },
    {
      provide: 'FindAllTasksGateway',
      useClass: Gateways.FindAllTasksImpl,
    },
    {
      provide: 'FindOneTaskGateway',
      useClass: Gateways.FindOneTaskImpl,
    },
    {
      provide: 'UpdateTaskGateway',
      useClass: Gateways.UpdateTaskImpl,
    },
    {
      provide: 'MemoryTaskMapper',
      useClass: Mapper.MemoryTaskMapper,
    },
  ],
})
export class AppModule {}
