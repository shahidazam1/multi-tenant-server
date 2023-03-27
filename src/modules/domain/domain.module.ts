import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from './schemas/address.schema';
import { Profile, ProfileSchema } from './schemas/profile.schema';
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
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
  ],
  exports: [MongooseModule],
})
export class DomainModule {}
