import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SignupDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from '../domain/schemas/user.schema';
import { Connection, Model } from 'mongoose';
import { SigninDto } from './dto/sign-in.dto';
import { verifyPassword } from 'src/utils/constants';
import { Profile } from '../domain/schemas/profile.schema';
import * as cookie from 'cookie';
import cookieParser from 'cookie-parser';
import { send } from 'process';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) // @InjectConnection('test1') private readonly db2: Connection,
  {}

  async signup(signupDto: SignupDto, response: any) {
    const cookies = [
      cookie.serialize('myCookie1', 'myValue1'),
      cookie.serialize('myCookie2', 'myValue2'),
    ];

    response.setHeader('Set-Cookie', cookies);
    response.send();
    return 'Cookies set successfully';

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
}
