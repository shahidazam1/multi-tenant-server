import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  Headers,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CloseConnectionInterceptor } from 'src/interceptors/close-mongo-connection.interceptor';

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

  @Get('my-profile')
  getMyProfile(@Req() req: any) {
    return this.profileService.getMyProfile(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.profileService.findOne(id, req.user.id);
  }

  @Cron(CronExpression.EVERY_SECOND)
  async dataFunction() {
    console.log('hello');
  }
}
