import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'tenants', id: true })
export class Tenant extends Document {
  @Prop()
  subdomain: string;

  @Prop()
  databaseName: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
