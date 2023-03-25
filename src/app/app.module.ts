import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig, mongoConfig2 } from 'src/config/mongodb-connection';
import { AuthModule } from 'src/modules/auth/auth.module';
import { DomainModule } from 'src/modules/domain/domain.module';
import { DbModule } from 'src/modules/mongoose/mongoose.module';
import { ProfileModule } from 'src/modules/profile/profile.module';

ConfigModule.forRoot({ isGlobal: true });
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
    // MongooseModule.forRootAsync({
    //   useFactory(config: ConfigService) {
    //     let uri = mongoConfig().MONGO_URI;
    //     return {
    //       uri,
    //     };
    //   },
    //   connectionName: 'profile',
    //   inject: [ConfigService],
    // }),

    DbModule,
    DomainModule,
    AuthModule,
    ProfileModule,
  ],
})
export class AppModule {}
