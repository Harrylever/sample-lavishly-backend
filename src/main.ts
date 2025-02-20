import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_VALUE!.split(',').map((v) => new RegExp(v.trim())),
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
