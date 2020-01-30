import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpDelete, httpGet, httpPost, httpPut, request, response } from 'inversify-express-utils';

import { DI_TOKEN, STATUS_CODE } from '../../constants';
import { CrudService } from '../../interfaces/crud-service.interface';
import { userSchema } from '../../middlewares/user.validation';
import { CrudController } from '../../interfaces/crud-controller.interface';
import { httpTryCatch } from '../../tools';
import { validator } from '../../index';

import { User } from './user.entity';

@controller('/users')
export class UserController implements CrudController {
  @inject(DI_TOKEN.UserService) private readonly userService: CrudService;

  @httpTryCatch
  @httpPost('/', validator.body(userSchema))
  async create(@request() request: Request, @response() response: Response) {
    const { login, password, age } = request.body;

    const defaultIsDeleted = false;
    const userToCreate = new User(login, password, age, defaultIsDeleted);
    const id = await this.userService.create(userToCreate);
    response.location(`/api/users/${id}`).sendStatus(STATUS_CODE.CREATED);
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
}
