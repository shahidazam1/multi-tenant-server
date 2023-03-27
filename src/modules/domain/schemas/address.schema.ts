import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, collection: 'address' })
export class Address extends Document {
  @Prop()
  address: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  userId: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
