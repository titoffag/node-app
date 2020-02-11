import dotenv from 'dotenv';

import { inversifyLoader } from './inversify.config';
import { typeOrmLoader } from './type-orm';
import { expressLoader } from './express';

export async function initializeLoaders() {
  dotenv.config();

  const diContainer = inversifyLoader();

  await typeOrmLoader(() => console.log('Type ORM Initialized'));
  await expressLoader(diContainer,() => console.log('Express Initialized'));
}
