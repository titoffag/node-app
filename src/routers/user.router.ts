import express from 'express';
import expressJoi from 'express-joi-validation';

import { routes } from '../constants';
import { userSchema } from '../middlewares/user.validation';
import { CrudController } from '../controllers/crud.interface';
import { container, DiToken } from '../di.container';

export const userRouter = express.Router();

const userController = container.get<CrudController>(DiToken.CrudController);
const validator = expressJoi.createValidator();

userRouter
  .route(routes.users.root)
  .get(userController.getAutoSuggest)
  .post(validator.body(userSchema), userController.create);

userRouter
  .route(routes.users.byId)
  .get(userController.getById)
  .put(validator.body(userSchema), userController.update)
  .delete(userController.remove);
