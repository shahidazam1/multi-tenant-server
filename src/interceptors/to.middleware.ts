import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose, { Connection, connection } from 'mongoose';

@Injectable()
export class MongooseConnectionMiddleware implements NestMiddleware {
  constructor(@InjectConnection() connection: Connection) {}
  use(req: any, res: any, next: () => void) {
    // Perform any actions you want to run after each request
    console.log(connection);
    mongoose.connection.close();
    next();
  }
}
