import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { mongoConfig2 } from 'src/config/mongodb-connection';
import { DBConnectionModule } from '../dbConnections/dbConnections.module';
import { AuthModule } from './../auth/auth.module';
import { DatabaseService } from './database.service';

const DATABASE_PROVIDER = {
  provide: 'DATABASE_CONNECTION',
  async useFactory(db: DatabaseService): Promise<Connection> {
    return db.getConnectionDetails();
  },
  inject: [DatabaseService],
};

@Global()
@Module({
  imports: [
    DBConnectionModule,
    AuthModule,
    MongooseModule.forRootAsync({
      useFactory() {
        let uri = mongoConfig2().MONGO_URI;
        return {
          uri,
        };
      },
      connectionName: 'admin1',
    }),
  ],

  providers: [DATABASE_PROVIDER, DatabaseService],
  exports: [DATABASE_PROVIDER],
})
export class DbModule {}
