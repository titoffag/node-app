import { createConnection } from 'typeorm';

export async function typeOrmLoader() {
  const connection = await createConnection();
  await connection.runMigrations();
}
