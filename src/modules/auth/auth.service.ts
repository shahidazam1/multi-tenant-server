import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as cookie from 'cookie';
import { Model } from 'mongoose';
import { verifyPassword } from 'src/utils/constants';
import { User } from '../domain/schemas/user.schema';
import { SigninDto } from './dto/sign-in.dto';
import { SignupDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name, 'admin1') private userModel: Model<User>, // @InjectConnection('test1') private readonly db2: Connection,
  ) {}

  async signup(signupDto: SignupDto) {
    let user = new this.userModel();
    user.name = signupDto.name;
    user.database = signupDto.database;
    user.password = await bcrypt.hash(signupDto.password, 10);
    await user.save();

    const payload = { sub: user._id, userId: user._id };
    const token = this.jwtService.sign(payload);

    return { token };
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

    return { token };
  }

  async sign() {
    const data = await this.userModel.findOne();
    return data;
  }
}
