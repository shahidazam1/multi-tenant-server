import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig, mongoConfig2 } from 'src/config/mongodb-connection';
import { AddressModule } from 'src/modules/address/address.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { DomainModule } from 'src/modules/domain/domain.module';
import { DbModule } from 'src/modules/mongoose/mongoose.module';
import { ProfileModule } from 'src/modules/profile/profile.module';
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
  ],
})
export class AppModule {}
