import { NestFactory } from '@nestjs/core';

import { configSWagger } from '@systems/config-swagger';

import { AppModule } from './app.module';
import { API_PREFIX_PATH, PORT } from '@configs/app.config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // config swagger
  configSWagger(app);

  // app.setGlobalPrefix(API_PREFIX_PATH);

  await app.listen(PORT);
  Logger.log(`http://localhost:${PORT}${API_PREFIX_PATH}`);
}
bootstrap();
