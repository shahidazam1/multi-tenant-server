import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { Request } from 'express';
import { Connection, Model } from 'mongoose';
import { mongoConfig } from 'src/config/mongodb-connection';
import { AuthService } from '../auth/auth.service';
import { User } from '../domain/schemas/user.schema';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly authService: AuthService,
  ) {}

  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    // console.log(data);
    const data: any = await this.authService.sign();
    console.log(this.request.headers);
    console.log(data?.database);

    let uri = mongoConfig(data?.database).MONGO_URI;

    return {
      uri,
    };
  }
}

// @Injectable({ scope: Scope.REQUEST })
// export class MongooseConfigService implements MongooseOptionsFactory {
//   constructor(@Inject(REQUEST) private readonly request: Request) {}

//   async createMongooseOptions(): Promise<MongooseModuleOptions> {
//     console.log(this.request.headers);
//     return {
//       uri: mongoConfig('test_server_2').MONGO_URI,
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     };
//   }
// }
