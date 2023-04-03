import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CornService {
  @Cron(CronExpression.EVERY_SECOND)
  async conn() {
    console.log('connection');
  }
}
