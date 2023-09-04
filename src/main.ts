import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { config } from 'dotenv';
import { AppModule } from './app.module';

config();

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(), {
    cors: true,
  });

  await app.listen(port, () =>
    console.log(`Server is running on port ${port}`),
  );
}
bootstrap();
