import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig2 } from 'src/config/mongodb-connection';
import { AuthModule } from '../auth/auth.module';
import { MongooseConfigService } from './mognoose.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory() {
        let uri = mongoConfig2().MONGO_URI;
        return {
          uri,
        };
      },
      connectionName: 'admin1',
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      imports: [AuthModule],
    }),
  ],
})
export class DbModule {}
