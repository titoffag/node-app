import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  request,
  response,
} from 'inversify-express-utils';

import { DI_TOKEN, STATUS_CODE } from '../constants';
import { CrudService } from '../services/crud.interface';
import { userSchema } from '../middlewares/user.validation';
import { User } from '../entities/user.entity';
import { validator } from '../index';

import { CrudController } from './crud.interface';

@controller('/users')
export class UserController implements CrudController {
  @inject(DI_TOKEN.UserService) private readonly userService: CrudService;

  @httpPost('/', validator.body(userSchema))
  async create(@request() request: Request, @response() response: Response) {
    const { login, password, age } = request.body;

    try {
      const defaultIsDeleted = false;
      const userToCreate = new User(login, password, age, defaultIsDeleted);
      const id = await this.userService.create(userToCreate);
      response.location(`/api/users/${id}`).sendStatus(STATUS_CODE.CREATED);
    } catch (error) {
      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }

  }

  @httpGet('/')
  async getAutoSuggest(@request() request: Request, @response() response: Response) {
    const { loginSubstring = '', limit = 5 } = request.query;

    try {
      const suggestedUsers = await this.userService.getAutoSuggest(loginSubstring, +limit);
      response.status(STATUS_CODE.OK).json(suggestedUsers);
    } catch (error) {
      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }
  }

  @httpGet('/:id')
  async getById(@request() request: Request, @response() response: Response) {
    const { id } = request.params;

    try {
      const user = await this.userService.getById(+id);
      response.status(STATUS_CODE.OK).json(user);
    } catch (error) {
      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }
  }

  @httpPut('/:id', validator.body(userSchema))
  async update(@request() request: Request, @response() response: Response) {
    const { id } = request.params;
    const { login, password, age } = request.body;

    try {
      const userToUpdate = new User(login, password, age);
      await this.userService.update(+id, userToUpdate);
      response.sendStatus(STATUS_CODE.NO_DATA);
    } catch (error) {
      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }
  }

  @httpDelete('/:id')
  async remove(@request() request: Request, @response() response: Response) {
    const { id } = request.params;

    try {
      await this.userService.remove(+id);
      response.sendStatus(STATUS_CODE.NO_DATA);
    } catch (error) {
      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }
  }
}
