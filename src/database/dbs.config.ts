import { DataSourceOptions } from 'typeorm';

import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_LOGGING,
} from '@configs/app.config';

export const DBS: DataSourceOptions[] = [
  {
    name: 'default',
    type: 'mysql',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: false,
    logging: DB_LOGGING,
    entities: [],
  },
];
