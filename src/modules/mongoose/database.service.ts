import { TENANT_DB_CONNECTIONS } from './../dbConnections/dbConnections.module';
import {
  BadRequestException,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import mongoose from 'mongoose';
import { mongoConfig } from 'src/config/mongodb-connection';
import { AuthService } from '../auth/auth.service';
import { Tenant } from '../domain/schemas/tenant.schema';

@Injectable({ scope: Scope.REQUEST })
export class DatabaseService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly authService: AuthService,
    @Inject(TENANT_DB_CONNECTIONS)
    private readonly dbConnections: any,
  ) {}

  async getConnectionDetails() {
    const tenantId = this.request.headers.tenantid;

    let data: Tenant & { _id: mongoose.Types.ObjectId };
    if (!tenantId) {
      throw new UnauthorizedException();
    }

    data = await this.authService.sign(tenantId.toString());

    if (!data) {
      throw new BadRequestException('Tenant Not Found');
    }

    const connection = this.dbConnections[tenantId.toString()];
    if (connection) {
      console.log('Reuse Connection');
      return connection;
    } else {
      const url = mongoConfig(tenantId.toString()).MONGO_URI;
      mongoose.set('strictQuery', false);
      // mongoose.connection.on('connected', () => {
      //   console.log('connected');
      // });

      // mongoose.connection.on('disconnected', () => {
      //   console.log('disconnected');
      // });
      console.log('new Connection');
      const mongooseConenction = await mongoose.createConnection(url);
      const connection = mongooseConenction;
      this.dbConnections[tenantId.toString()] = connection;
      return connection;
    }
  }
}
