import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { database2Config, mongoConfig2 } from 'src/config/mongodb-connection';
import { AuthModule } from 'src/modules/auth/auth.module';
import { DomainModule } from 'src/modules/domain/domain.module';
import { DbModule } from 'src/modules/mongoose/mongoose.module';
import { ProfileModule } from 'src/modules/profile/profile.module';

ConfigModule.forRoot({ isGlobal: true });
@Module({
  imports: [
    // MongooseModule.forRootAsync({
    //   useFactory: database2Config,
    // }),
    DbModule,
    DomainModule,
    AuthModule,
    ProfileModule,
  ],
})
export class AppModule {}
