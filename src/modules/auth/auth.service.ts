import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { verifyPassword } from 'src/utils/constants';
import { Tenant } from '../domain/schemas/tenant.schema';
import { User } from '../domain/schemas/user.schema';
import { SigninDto } from './dto/sign-in.dto';
import { SignupDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name, 'admin1') private userModel: Model<User>,
    @InjectModel(Tenant.name, 'admin1') private tenantModel: Model<Tenant>,
  ) {}

  async signup(signupDto: SignupDto) {
    let user = new this.userModel();
    user.name = signupDto.name;
    user.tenantId = signupDto.tenantId;
    user.password = await bcrypt.hash(signupDto.password, 10);
    await user.save();

    const payload = { sub: user._id, userId: user._id };
    const token = this.jwtService.sign(payload);

    const tenant = await this.tenantModel.findOne({
      _id: user.tenantId,
    });

    return { token, tenant };
  }

  async signin(signinDto: SigninDto) {
    const exists = await this.userModel.findOne({
      name: signinDto.name,
    });

    if (!exists) {
      throw new BadRequestException('User Not Found');
    }

    const isValidPassword = await verifyPassword(
      signinDto.password,
      exists.password,
    );
    if (!isValidPassword) {
      throw new UnprocessableEntityException('The password is wrong.');
    }

    const payload = { sub: exists._id, userId: exists._id };
    const token = this.jwtService.sign(payload);

    // const data = await this.userModel.aggregate([
    //   { $match: { name: signinDto.name } },
    //   {
    //     $lookup: {
    //       from: 'tenants',
    //       as: 'tenant',
    //       localField: 'tenantId',
    //       foreignField: '_id',
    //     },
    //   },
    //   // {
    //   //   $unwind: {
    //   //     path: '$tenant',
    //   //     preserveNullAndEmptyArrays: true,
    //   //   },
    //   // },
    // ]);

    const tenant = await this.tenantModel.findOne({
      _id: exists.tenantId,
    });

    return { token, tenant };
  }

  async sign(id: string) {
    const data = await this.tenantModel.findOne({
      _id: id,
    });
    return data;
  }
}
