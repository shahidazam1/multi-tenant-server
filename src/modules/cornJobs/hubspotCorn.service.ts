import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { Profile, ProfileSchema } from '../domain/schemas/profile.schema';
import { DataService } from './data.service';

@Injectable()
export class HubspotCornService {
  async getHubspotData(connection: Connection, models) {
    const data = await models.profileModel.find({});
    await this.getRes(data, models);
  }

  async getRes(data, models) {
    let res = await models.profileModel.findOne({});
    console.log('hello', res);
  }
}
