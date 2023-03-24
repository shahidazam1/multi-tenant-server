import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { Request } from 'express';
import { mongoConfig } from 'src/config/mongodb-connection';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(
    @Inject(REQUEST) private readonly request: Request, //private readonly myService: ProfileService,
  ) {}

  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    // console.log(data);
    console.log(this.request.headers);
    return {
      uri: mongoConfig('test_server_12').MONGO_URI,
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
