import express from 'express';

import { routes } from '../constants';

import { userRouter } from './user.router';

export const rootRouter = express.Router();

rootRouter.use(routes.users.name, userRouter);
