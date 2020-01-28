import express from 'express';

import { routes } from '../constants';
import { UserController } from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter
  .route(routes.users.root)
  .get(UserController.getAutoSuggest)
  .post(UserController.create);

userRouter
  .route(routes.users.byId)
  .get(UserController.getById)
  .put(UserController.update)
  .delete(UserController.remove);
