import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import * as compression from 'compression';
import { json, urlencoded } from 'express';
import { WrapRequestInterceptor } from './interceptors/wrap-request.interceptor';
import { UnhandledExceptionFilter } from './filters/unhandled-exception.filter';
import * as cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { MongooseConnectionMiddleware } from './interceptors/to.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use((req, res, next) => {
    // Middleware logic goes here
    mongoose.connection.close();
    console.log('Middleware executed!');

    next();
  });
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  // app.use(new MongooseConnectionMiddleware());
  app.useGlobalInterceptors(new WrapRequestInterceptor());
  app.useGlobalFilters(new UnhandledExceptionFilter());
  mongoose.set('debug', true);
  await app.listen(880);
}
bootstrap();
