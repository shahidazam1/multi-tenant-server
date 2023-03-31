import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MongoService } from './mongo.service';

@Injectable()
export class CronService {
  constructor(private readonly mongoService: MongoService) {}

  @Cron(CronExpression.EVERY_10_HOURS)
  async handleCron() {
    const dbNames = await this.mongoService.getDbNames();

    for (const dbName of dbNames) {
      const db = await this.mongoService.getDb(dbName);
      const doc = await this.mongoService.findDocuments(dbName, 'profiles', {});

      console.log(doc);
      // Perform desired operations on the dynamic database
      // ...
    }
  }
}
