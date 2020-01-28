import express from 'express';

import { userRouter } from './user.router';
import { routes } from '../constants';

export const rootRouter = express.Router();

rootRouter.use(routes.users.name, userRouter);
