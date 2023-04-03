import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TENANT_DB_CONNECTIONS } from './../dbConnections/dbConnections.module';
import { Profile, ProfileSchema } from '../domain/schemas/profile.schema';

@Injectable()
export class DataService {
  constructor(
    @Inject(TENANT_DB_CONNECTIONS)
    private readonly dbConnections: any,
  ) {}

  @Cron(CronExpression.EVERY_10_HOURS)
  async getConnectionDetails() {
    const keys = Object.keys(this.dbConnections);
    let connection: any;

    for (let key of keys) {
      console.log(key);
      connection = this.dbConnections[key.toString()];
      await this.getData(connection);
      await this.getOffice(connection);

      // const data = await profileModel.find({});
      console.log('helllo');
    }

    return this.dbConnections[0];
  }

  async getData(connection) {
    const profileModel = connection.model(Profile.name, ProfileSchema);
    const data = await profileModel.find({});
    console.log(data);
  }

  async getOffice(connection) {}
}
