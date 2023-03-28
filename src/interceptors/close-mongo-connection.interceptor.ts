import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import mongoose, { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { ProfileService } from 'src/modules/profile/profile.service';

@Injectable()
export class CloseConnectionInterceptor implements NestInterceptor {
  constructor(private readonly profileService: ProfileService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    // let daat = await this.profileService.dataa();
    // console.log(daat);
    return next.handle().pipe(
      tap(async () => {
        mongoose.connection.close();
        mongoose.connection.on('disconnected', () => {
          console.log('MongoDB connection is closed');
        });
      }),
    );
  }
}
