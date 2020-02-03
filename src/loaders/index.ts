import { Express } from 'express';
import dotenv from 'dotenv';

import { expressLoader } from './express';
// import { postgresLoader } from './postgres';

export async function initializeLoaders(app: Express) {
  dotenv.config();

  await expressLoader(app, () => console.log('Express Initialized'));
  // await postgresLoader(() => console.log('Sequelize Initialized'));
}
