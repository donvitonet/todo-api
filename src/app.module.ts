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
    {
      provide: 'CreateTaskGateway',
      useClass: Gateways.CreateTaskImpl,
    },
    {
      provide: 'FindAllTasksGateway',
      useClass: Gateways.FindAllTaskImpl,
    },
    {
      provide: 'MemoryTaskMapper',
      useClass: Mapper.MemoryTaskMapper,
    },
  ],
})
export class AppModule {}
