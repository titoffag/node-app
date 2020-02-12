import 'reflect-metadata';
import expressJoi from 'express-joi-validation';

export const validator = expressJoi.createValidator();

import './features/users/user.controller';
import './features/groups/group.controller';

import { initializeLoaders } from './loaders';

async function startServer() {
  await initializeLoaders();
}

startServer();

// process.on('uncaughtException', () => console.log('uncaughtException'));
