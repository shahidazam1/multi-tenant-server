import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from '../profile/profile.module';
import { ProfileService } from '../profile/profile.service';
import { MongooseConfigService } from './mognoose.service';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { mongoConfig2 } from 'src/config/mongodb-connection';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory(config: ConfigService) {
        let uri = mongoConfig2().MONGO_URI;
        return {
          uri,
        };
      },
      connectionName: 'admin1',
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      imports: [AuthModule],
    }),
  ],
})
export class DbModule {}
