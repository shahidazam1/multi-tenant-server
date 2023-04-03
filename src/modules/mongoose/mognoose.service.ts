import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { Request } from 'express';
import mongoose from 'mongoose';
import { mongoConfig } from 'src/config/mongodb-connection';
import { AuthService } from '../auth/auth.service';
import { Tenant } from '../domain/schemas/tenant.schema';

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

    let data: Tenant & { _id: mongoose.Types.ObjectId };
    if (tenantId) {
      data = await this.authService.sign(tenantId);
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
