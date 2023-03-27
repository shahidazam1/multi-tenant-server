import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Profile } from '../domain/schemas/profile.schema';
import { User } from '../domain/schemas/user.schema';
import { ProfileService } from './profile.service';

@Injectable()
export class MyService implements OnModuleInit {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly profileService: ProfileService,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  public onModuleInit(): any {
    this.schedulerRegistry.addCronJob('myCronJob', this.myCronJob);
  }

  @Cron(CronExpression.EVERY_11_HOURS)
  public async myCronJob() {
    // console.log('Running cron job!');
    console.log(this.profileService.autoImportSalesforceData());
  }
}
