import 'reflect-metadata';

import './tools/validator';

import './features/users/user.controller';
import './features/groups/group.controller';

import { initializeLoaders } from './loaders';

async function startServer() {
  await initializeLoaders();
}

startServer();

// process.on('uncaughtException', () => console.log('uncaughtException'));
