import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CornModule } from 'src/modules/cornJobs/corn.module';
import { DomainModule } from 'src/modules/domain/domain.module';
import { DbModule } from 'src/modules/mongoose/mongoose.module';
import { ProfileModule } from 'src/modules/profile/profile.module';
import { TenantModule } from 'src/modules/tenant/tenant.module';

ConfigModule.forRoot({ isGlobal: true });
@Module({
  imports: [
    ScheduleModule.forRoot(),
    DbModule,
    TenantModule,
    DomainModule,
    AuthModule,
    ProfileModule,
    CornModule,
  ],
})
export class AppModule {}
