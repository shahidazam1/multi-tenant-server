import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from '../profile/profile.module';
import { ProfileService } from '../profile/profile.service';
import { MongooseConfigService } from './mognoose.service';
import { ConfigService } from '@nestjs/config';
import { MyService } from './user.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      imports: [ProfileModule],
    }),
  ],
  providers: [ProfileService],
})
export class DbModule {}
