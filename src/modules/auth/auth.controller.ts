import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { SigninDto } from './dto/sign-in.dto';
import { SignupDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signup(@Body() signupDto: SignupDto, @Res() response: Response) {
    response.cookie('myCookie', 'cookieValue');
    const data = { message: 'Data returned' };
    response.status(200).json(data);
    // return this.authService.signup(signupDto, response);
  }

  @Post('sign-in')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}
