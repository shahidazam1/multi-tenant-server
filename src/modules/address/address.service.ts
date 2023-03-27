import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from '../domain/schemas/address.schema';
import { Profile } from '../domain/schemas/profile.schema';
import { User } from '../domain/schemas/user.schema';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(User.name, 'admin1') private userModel: Model<User>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {}

  async create(profile: CreateAddressDto, id: string) {
    const user = await this.userModel.findOne({ _id: id });

    if (!user) {
      throw new BadRequestException('user Not exists');
    }

    let profileDetails = new this.addressModel();
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

  async getAll() {
    return await this.addressModel.find();
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
}
