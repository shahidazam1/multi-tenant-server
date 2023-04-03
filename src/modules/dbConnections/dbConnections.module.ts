import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';

export const TENANT_DB_CONNECTIONS = 'TENANT_DB_CONNECTIONS';

const dbConnections = () => {
  const map = new Map<string, Connection>();
  return map;
};

@Module({
  providers: [
    {
      provide: TENANT_DB_CONNECTIONS,
      useFactory: dbConnections,
    },
  ],
  exports: [TENANT_DB_CONNECTIONS],
})
export class DBConnectionModule {}
