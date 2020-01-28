import express from 'express';
import expressJoi from 'express-joi-validation';

import { routes } from '../constants';
import { UserController } from '../controllers/user.controller';
import { userSchema } from '../middlewares/user.validation';

export const userRouter = express.Router();

const validator = expressJoi.createValidator();

userRouter
  .route(routes.users.root)
  .get(UserController.getAutoSuggest)
  .post(validator.body(userSchema), UserController.create);

userRouter
  .route(routes.users.byId)
  .get(UserController.getById)
  .put(validator.body(userSchema), UserController.update)
  .delete(UserController.remove);
