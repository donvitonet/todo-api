import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { UniqueEntityIDGeneratorFactory } from './entities/id-generator-factory';
import UUIDEntityGenerator from './infra/plugins/uuid-id-generator';

function initIdFactories() {
  const factories = {
    default: new UUIDEntityGenerator(),
  };
  UniqueEntityIDGeneratorFactory.getInstance().initialize(factories);
}

async function bootstrap() {
  initIdFactories();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
