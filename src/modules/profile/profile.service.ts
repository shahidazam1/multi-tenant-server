import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Profile } from '../domain/schemas/profile.schema';
import { User } from '../domain/schemas/user.schema';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name, 'admin1') private userModel: Model<User>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(profile: CreateProfileDto, id: string) {
    const user = await this.userModel.findOne({ _id: id });

    if (!user) {
      throw new BadRequestException('user Not exists');
    }

    let profileDetails = new this.profileModel();
    profileDetails.note = profile.note;

    profileDetails.userId = id;
    await profileDetails.save();
    return profileDetails;
  }

  async findOne(id: string, userId: string) {
    const profile = await this.profileModel.findOne({ userId });

    if (!profile) {
      throw new BadRequestException('Not Found');
    }

    return await this.profileModel.findOne({ _id: id });
  }

  async dataa() {
    return await this.connection.close();
  }

  async getAll() {
    const data = await this.profileModel.find({});
    return data;
  }

  async getMyProfile(id: string) {
    const user = await this.userModel.findOne({ _id: id });

    if (!user) {
      throw new BadRequestException('user Not exists');
    }

    const profile = await this.profileModel.aggregate([
      { $match: { userId: user._id } },
    ]);

    return profile;
  }

  autoImportSalesforceData() {
    return 'hello World!';
  }
}
