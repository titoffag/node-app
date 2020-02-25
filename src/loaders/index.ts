import dotenv from 'dotenv';

import { inversifyLoader } from './inversify.config';
import { typeOrmLoader } from './type-orm';
import { expressLoader } from './express';

export async function initializeLoaders() {
  dotenv.config();

  const diContainer = inversifyLoader();

  await typeOrmLoader(() => console.log('Type ORM initialized'));
  await expressLoader(diContainer,(port) => console.log(`Express initialized and listening on port ${port}`));
}
