import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Profile } from '../domain/schemas/profile.schema';
import { User } from '../domain/schemas/user.schema';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly dbConnection: Connection,
    @Inject(Profile.name) private readonly profileModel: Model<Profile>,
  ) {
    // console.log('connected', this.dbConnection, this.dbConnection.port);
  }

  async create(profile: CreateProfileDto, id: string) {
    // const user = await this.userModel.findOne({ _id: id });
    // if (!user) {
    //   throw new BadRequestException('user Not exists');
    // }
    // let profileDetails = new this.profileModel();
    // profileDetails.note = profile.note;
    // profileDetails.userId = id;
    // await profileDetails.save();
    // return profileDetails;
  }

  async getAll() {
    return this.profileModel.find();
  }
}
