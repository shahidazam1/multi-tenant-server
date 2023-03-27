import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { MyService } from './corn.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [ProfileController],
  providers: [ProfileService, MyService],
  exports: [ProfileService],
})
export class ProfileModule {}
