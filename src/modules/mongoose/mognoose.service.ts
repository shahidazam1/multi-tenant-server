import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { Request } from 'express';
import { mongoConfig } from 'src/config/mongodb-connection';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly authService: AuthService,
  ) {}

  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    console.log(this.request.headers);
    const tenantId: any = this.request.headers.tenantid;

    const data = await this.authService.sign(tenantId);

    if (!data?.databaseName) {
      throw new UnprocessableEntityException(
        'Plese Try again , something went wrong',
      );
    }
    let uri = mongoConfig(data?.databaseName).MONGO_URI;

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
