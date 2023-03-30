import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CloseConnectionInterceptor implements NestInterceptor {
  constructor(@InjectConnection() private connection: Connection) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    return next.handle().pipe(
      tap(async () => {
        if (this.connection.readyState !== 0) {
          await this.connection.close();
        }
      }),
    );
  }
}
