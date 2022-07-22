import { Module } from '@nestjs/common';
import { TasksController } from './infra/controllers/tasks.controller';
import CreateTaskInteractor from 'src/use-cases/tasks/create-task/create-task.interactor';
import CreateTaskImpl from './adapters/gateway/tasks/create-task/create-task.impl';
import { MemoryTaskMapper } from './infra/mappers/memory-task.mapper';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [
    CreateTaskInteractor,
    {
      provide: 'CreateTaskGateway',
      useClass: CreateTaskImpl,
    },
    {
      provide: 'MemoryTaskMapper',
      useClass: MemoryTaskMapper,
    },
  ],
})
export class AppModule {}
