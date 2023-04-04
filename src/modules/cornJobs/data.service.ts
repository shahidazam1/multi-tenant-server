import { HubspotCornService } from './hubspotCorn.service';
import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TENANT_DB_CONNECTIONS } from './../dbConnections/dbConnections.module';
import { Profile, ProfileSchema } from '../domain/schemas/profile.schema';
import { Connection } from 'mongoose';

@Injectable()
export class DataService {
  constructor(
    @Inject(TENANT_DB_CONNECTIONS)
    private readonly dbConnections: any,
    private readonly hubsoptCornService: HubspotCornService,
  ) {}

  @Cron(CronExpression.EVERY_10_HOURS)
  async getConnectionDetails() {
    const keys = Object.keys(this.dbConnections);
    let connection: Connection;

    for (let key of keys) {
      connection = this.dbConnections[key.toString()];
      if (connection) {
        await this.hubsoptCornService.getHubspotData(connection);
      }
    }
  }
}
