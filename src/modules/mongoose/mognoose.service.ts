import {
  Inject,
  Injectable,
  UnprocessableEntityException,
  OnModuleDestroy,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  InjectConnection,
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { Request } from 'express';
import { mongoConfig } from 'src/config/mongodb-connection';
import { AuthService } from '../auth/auth.service';
import mongoose, { Connection } from 'mongoose';

@Injectable()
export class MongooseConfigService
  implements MongooseOptionsFactory, OnModuleDestroy
{
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly authService: AuthService,
  ) {}

  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    console.log(this.request.headers);
    const tenantId: any = this.request.headers.tenantid;

    const data = await this.authService.sign(tenantId);

    if (!data?.databaseName) {
      throw new UnprocessableEntityException(
        'Plese Try again , something went wrong',
      );
    }
    let uri = mongoConfig(data?.databaseName).MONGO_URI;

    return {
      uri,
    };
  }

  onModuleDestroy() {
    console.log('disconnect');
    mongoose.connection.close();
  }
}
