import { Module } from '@nestjs/common';
import { DBConnectionModule } from '../dbConnections/dbConnections.module';
import { DataService } from './data.service';

@Module({
  imports: [DBConnectionModule],
  providers: [DataService],
})
export class CornModule {}
