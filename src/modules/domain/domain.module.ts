import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MODELS_PROVIDERS } from './mongoose.provider';
import { Tenant, TenantSchema } from './schemas/tenant.schema';
import { User, UserSchema } from './schemas/user.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'admin1',
    ),
    MongooseModule.forFeature(
      [{ name: Tenant.name, schema: TenantSchema }],
      'admin1',
    ),
    // MongooseModule.forFeature(MODELS_PROVIDERS),
  ],
  providers: [...MODELS_PROVIDERS],
  exports: [MongooseModule, ...MODELS_PROVIDERS],
})
export class DomainModule {}
