import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // Importe o SwaggerModule e o DocumentBuilder
import { config } from 'dotenv';
import { AppModule } from './app.module';

config();

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(), {
    cors: true,
  });

  // Configuração do Swagger
  const options = new DocumentBuilder()
    .setTitle('API Despesas Pessoais')
    .setDescription('API para gerenciamento de despesas pessoais')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(port, () =>
    console.log(`Server is running on port ${port}`),
  );
}
bootstrap();
