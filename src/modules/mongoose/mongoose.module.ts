import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from '../profile/profile.module';
import { ProfileService } from '../profile/profile.service';
import { MongooseConfigService } from './mognoose.service';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    // MongooseModule.forRootAsync({
    //   useClass: MongooseConfigService,
    // }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      imports: [AuthModule, ProfileModule],
    }),
  ],
})
export class DbModule {}
