import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto, @Req() req: any) {
    return this.profileService.create(createProfileDto, req.user.id);
  }

  @Get()
  getAll() {
    return this.profileService.getAll();
  }

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  cornjob() {
    console.log('daat');
  }
}
