import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  all,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  request,
  response,
} from 'inversify-express-utils';

import { DI_TOKEN, STATUS_CODE } from '../../constants';
import { httpTryCatch } from '../../tools';
import { validator } from '../../tools/validator';

import { UserController } from './user-controller.interface';
import { UserService } from './user-service.interface';
import { User } from './user.entity';
import { userSchema } from './user.validation';

@controller('/users')
export class UserControllerImpl implements UserController {
  @inject(DI_TOKEN.UserService) private readonly userService: UserService;

  @httpTryCatch
  @httpPost('/', validator.body(userSchema))
  async create(@request() request: Request, @response() response: Response) {
    const { login, password, age } = request.body;

    const defaultIsDeleted = false;
    const userToCreate = new User(login, password, age, defaultIsDeleted);
    const id = await this.userService.create(userToCreate);
    response.location(`/users/${id}`).sendStatus(STATUS_CODE.CREATED);
  }

  @httpTryCatch
  @httpGet('/')
  async getAutoSuggest(@request() request: Request, @response() response: Response) {
    const { loginSubstring = '', limit = 5 } = request.query;

    const suggestedUsers = await this.userService.getAutoSuggest(loginSubstring, +limit);
    response.status(STATUS_CODE.OK).json(suggestedUsers);
  }

  @httpTryCatch
  @httpGet('/:id')
  async getById(@request() request: Request, @response() response: Response) {
    const { id } = request.params;

    const user = await this.userService.getById(+id);
    response.status(STATUS_CODE.OK).json(user);
  }

  @httpTryCatch
  @httpPut('/:id', validator.body(userSchema))
  async update(@request() request: Request, @response() response: Response) {
    const { id } = request.params;
    const { login, password, age } = request.body;

    const userToUpdate = new User(login, password, age);
    await this.userService.update(+id, userToUpdate);
    response.sendStatus(STATUS_CODE.NO_DATA);
  }

  @httpTryCatch
  @httpDelete('/:id')
  async remove(@request() request: Request, @response() response: Response) {
    const { id } = request.params;

    await this.userService.remove(+id);
    response.sendStatus(STATUS_CODE.NO_DATA);
  }

  @all('**')
  async methodNotAllowed(@request() request: Request, @response() response: Response) {
    const {
      route: { methods, path },
      method,
    } = request;
    const allowedMethods = Object.keys(methods)
      .filter(method => method !== '_all')
      .map(key => key.toUpperCase())
      .join(', ') || 'GET, POST, PUT, DELETE';

    const message = `Unsupported method ${method} applied at ${path}. Allowed methods: ${allowedMethods}`;
    console.log(message);

    response.header('Allow', allowedMethods).sendStatus(STATUS_CODE.METHOD_NOT_ALLOWED);
  }
}
