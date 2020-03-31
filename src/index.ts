import 'reflect-metadata';

import { logger } from './tools';

import './features/users/user.controller';
import './features/groups/group.controller';

import { initializeLoaders } from './loaders';

async function startServer() {
  await initializeLoaders();
}

startServer();

process
  .on('unhandledRejection', (reason: number, promise: Promise<any>) => {
    logger.error(`Unhandled rejection of promise: ${JSON.stringify(promise)} by reason: ${reason}`);
    process.exit(1);
  })
  .on('uncaughtException', (error: Error) => {
    logger.error(`Uncaught exception: ${error}`);
    process.exit(1);
  });
