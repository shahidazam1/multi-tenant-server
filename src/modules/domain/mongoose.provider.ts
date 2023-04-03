import { Connection } from 'mongoose';
import { Profile, ProfileSchema } from './schemas/profile.schema';

export const MODELS_PROVIDERS = [
  {
    provide: Profile.name,
    useFactory(connection: Connection) {
      return connection.model(Profile.name, ProfileSchema);
    },
    inject: ['DATABASE_CONNECTION'],
  },
];
