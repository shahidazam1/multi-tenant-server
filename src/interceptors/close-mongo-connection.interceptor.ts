import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Profile } from 'src/modules/domain/schemas/profile.schema';
import { ProfileService } from 'src/modules/profile/profile.service';

@Injectable()
export class CloseConnectionInterceptor implements NestInterceptor {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
    private readonly profileService: ProfileService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    console.log('Before request is processed');

    return next.handle().pipe(
      tap(async () => {
        console.log('After request is processed', this.connection);
        //  let daat = await this.profileService.dataa();

        if (this.connection && this.connection.readyState !== 0) {
          console.log('After request is conn');
          this.connection.close();
        }
      }),
    );
  }
}
