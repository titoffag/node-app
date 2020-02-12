import { createConnection } from 'typeorm';

import { User } from '../features/users';
import { Group } from '../features/groups';

export async function typeOrmLoader(callback: () => void) {
  await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12345678',
    database: 'db',
    schema: 'node',
    entities: [User, Group],
  });

  callback();
}
