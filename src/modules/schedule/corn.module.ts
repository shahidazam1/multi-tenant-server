import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './corn.service';
import { MongoService } from './mongo.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [CronService, MongoService],
})
export class CornModule {}
