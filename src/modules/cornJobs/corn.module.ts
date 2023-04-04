import { Module } from '@nestjs/common';
import { DBConnectionModule } from '../dbConnections/dbConnections.module';
import { DataService } from './data.service';
import { HubspotCornService } from './hubspotCorn.service';

@Module({
  imports: [DBConnectionModule],
  providers: [DataService, HubspotCornService],
})
export class CornModule {}
