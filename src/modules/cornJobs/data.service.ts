import { connection } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TENANT_DB_CONNECTIONS } from './../dbConnections/dbConnections.module';

@Injectable()
export class DataService {
  constructor(
    @Inject(TENANT_DB_CONNECTIONS)
    private readonly dbConnections: any,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async getConnectionDetails() {
    const keys = Object.keys(this.dbConnections);
    let connection: any;

    for (let key of keys) {
      console.log(key);
      connection = this.dbConnections[key.toString()];

      console.log('helllo');
    }

    return this.dbConnections[0];
  }
}
