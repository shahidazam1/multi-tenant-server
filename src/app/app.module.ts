import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/modules/auth/auth.module';
import { DomainModule } from 'src/modules/domain/domain.module';
import { DbModule } from 'src/modules/mongoose/mongoose.module';
import { ProfileModule } from 'src/modules/profile/profile.module';
import mongoConfig from '../config/mongodb-connection';

ConfigModule.forRoot({ isGlobal: true });

@Module({
  imports: [
    // MongooseModule.forRoot(mongoConfig().MONGO_URI),
    DbModule,
    DomainModule,
    AuthModule,
    ProfileModule,
  ],
})
export class AppModule {}
