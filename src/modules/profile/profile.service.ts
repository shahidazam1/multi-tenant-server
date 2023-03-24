import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from '../domain/schemas/profile.schema';
import { User } from '../domain/schemas/user.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async create(profile: CreateProfileDto, id: string) {
    const user = await this.userModel.findOne({ _id: id });

    if (!user) {
      throw new BadRequestException('user Not exists');
    }

    let profileDetails = new this.profileModel();
    profileDetails.address = profile.address;

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

  getAll() {
    // return await this.profileModel.find({});
    return 'hello world';
  }

  async getMyProfile(id: string) {
    const user = await this.userModel.findOne({ _id: id });

    if (!user) {
      throw new BadRequestException('user Not exists');
    }

    const profile = await this.profileModel.aggregate([
      { $match: { userId: user._id } },
    ]);

    return profile[0];
  }

  async update(id: string, updateProfile: UpdateProfileDto, userId: string) {
    return '';
  }

  async remove(id: string) {
    return this.profileModel.remove({ _id: id });
  }
}
