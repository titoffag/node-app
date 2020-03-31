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
  // BaseHttpController
} from 'inversify-express-utils';
import passport from 'passport';
// import { Strategy } from 'passport-local';

import { DI_TOKEN, STATUS_CODE } from '../../constants';
import { httpTryCatch, validator } from '../../tools';

import { UserService } from './user-service.interface';
import { AuthService } from './auth-service.interface';
import { User } from './user.entity';
import { userSchema } from './user.validation';

@controller('/users')
export class UserController {
  @inject(DI_TOKEN.UserService) private readonly userService: UserService;
  @inject(DI_TOKEN.AuthService) private readonly authService: AuthService;

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
    // todo: add offset = 0

    const suggestedUsers = await this.userService.getAutoSuggest(loginSubstring, +limit);
    response.status(STATUS_CODE.OK).json(suggestedUsers);
  }

  @httpGet('/:id')
  async getById(@request() request: Request, @response() response: Response) {
    const { id } = request.params;

    const user = await this.userService.getById(+id);
    response.status(STATUS_CODE.OK).json(user);
  }

  @httpPut('/:id', validator.body(userSchema))
  async update(@request() request: Request, @response() response: Response) {
    const { id } = request.params;
    const { login, password, age } = request.body;

    const userToUpdate = new User(login, password, age);
    await this.userService.update(+id, userToUpdate);
    response.sendStatus(STATUS_CODE.NO_DATA);
  }

  @httpDelete('/:id')
  async remove(@request() request: Request, @response() response: Response) {
    const { id } = request.params;

    await this.userService.remove(+id);
    response.sendStatus(STATUS_CODE.NO_DATA);
  }

  @httpPost('/login', passport.authenticate('local'))
  async login(@request() request: Request, @response() response: Response) {
    const { username, password } = request.body;

    await this.authService.login(username, password);
    response.sendStatus(STATUS_CODE.OK);
  }

  @all('**')
  async methodNotAllowed(@request() request: Request, @response() response: Response) {
    // todo: this method to abstract base controller
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
