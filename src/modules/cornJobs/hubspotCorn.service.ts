import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { Profile, ProfileSchema } from '../domain/schemas/profile.schema';
import { DataService } from './data.service';

@Injectable()
export class HubspotCornService {
  async getHubspotData(connection: Connection) {
    const profileModel = connection.model(Profile.name, ProfileSchema);
    const data = await profileModel.find({});
    await this.getRes(data, profileModel);
  }

  async getRes(data, profileModel) {
    let res = await profileModel.findOne({});
    console.log('hello', res);
  }
}
