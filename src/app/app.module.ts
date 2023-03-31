import { Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, REQUEST } from '@nestjs/core';
import { CloseConnectionInterceptor } from 'src/interceptors/close-mongo-connection.interceptor';
import { AddressModule } from 'src/modules/address/address.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { DomainModule } from 'src/modules/domain/domain.module';
import { DbModule } from 'src/modules/mongoose/mongoose.module';
import { ProfileModule } from 'src/modules/profile/profile.module';
import { CornModule } from 'src/modules/schedule/corn.module';
import { TenantModule } from 'src/modules/tenant/tenant.module';

ConfigModule.forRoot({ isGlobal: true });
@Module({
  imports: [
    DbModule,
    TenantModule,
    DomainModule,
    AuthModule,
    ProfileModule,
    AddressModule,
    CornModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CloseConnectionInterceptor,
      scope: Scope.REQUEST,
    },
  ],
})
export class AppModule {}
