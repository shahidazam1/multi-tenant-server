import { Injectable } from '@nestjs/common';

@Injectable()
export class MyService {
  doSomething(): any {
    return 'this is custom';
  }
}
