import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import compression from '@fastify/compress';
import { constants } from 'zlib';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  await app.register(require('@fastify/static'), {
    root: join(__dirname, '..', 'uploads'),
    prefix: '/static/',
  });

  app.enableCors();
  app.setGlobalPrefix('api/');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Mo medee site')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
