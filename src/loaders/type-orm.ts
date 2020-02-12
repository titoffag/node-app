import { createConnection } from 'typeorm';

export async function typeOrmLoader(callback: () => void) {
  await createConnection();

  callback();
}
