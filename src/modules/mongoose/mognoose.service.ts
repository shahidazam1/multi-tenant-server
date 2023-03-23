import { Inject, Injectable, Scope } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from '@nestjs/common';
import mongoConfig from 'src/config/mongodb-connection';

@Injectable({ scope: Scope.REQUEST })
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: mongoConfig('test_server').MONGO_URI,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
