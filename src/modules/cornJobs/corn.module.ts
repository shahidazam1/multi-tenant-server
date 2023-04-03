import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DBConnectionModule } from '../dbConnections/dbConnections.module';
import { CornService } from './corn.service';
import { DataService } from './data.service';

const DATA_PROVIDER = {
  provide: 'CORN_CONNECTION',
  async useFactory(db: DataService): Promise<Connection> {
    return db.getConnectionDetails();
  },
  inject: [DataService],
};

@Module({
  imports: [DBConnectionModule],
  providers: [DATA_PROVIDER, DataService, CornService],
  exports: [DATA_PROVIDER],
})
export class CornModule {}
