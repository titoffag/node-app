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
  requestParam,
  requestBody,
  queryParam,
  response,
  BaseHttpController,
} from 'inversify-express-utils';

import { DI_TOKEN, STATUS_CODE } from '../../constants';
import { httpTryCatch, validator, methodNotAllowed } from '../../tools';

import { UserService } from './user-service.interface';
import { User } from './user.entity';
import { userSchema } from './user.validation';

@controller('/users')
export class UserController extends BaseHttpController {
  @inject(DI_TOKEN.UserService) private readonly userService: UserService;

  @httpTryCatch
  @httpPost('/', validator.body(userSchema))
  async create(@requestBody() { login, password, age }: any) {
    const defaultIsDeleted = false;
    const userToCreate = new User(login, password, age, defaultIsDeleted);
    const createdUser = await this.userService.create(userToCreate);

    return this.created(`/users/${createdUser.id}`, createdUser);
  }

  @httpTryCatch
  @httpGet('/')
  async getAutoSuggest(
    @queryParam('loginSubstring') loginSubstring: string = '',
    @queryParam('limit') limit: string = 5,
  ) {
    const suggestedUsers = await this.userService.getAutoSuggest(loginSubstring, +limit);
    return this.json(suggestedUsers);
  }

  @httpTryCatch
  @httpGet('/:id')
  async getById(@requestParam('id') id: string) {
    const user = await this.userService.getById(+id);
    return this.json(user);
  }

  @httpTryCatch
  @httpPut('/:id', validator.body(userSchema))
  async update(@requestParam('id') id: string, @requestBody() { login, password, age }: any) {
    const userToUpdate = new User(login, password, age);
    await this.userService.update(+id, userToUpdate);
    return this.statusCode(STATUS_CODE.NO_DATA);
  }

  @httpTryCatch
  @httpDelete('/:id')
  async remove(@requestParam('id') id: string) {
    await this.userService.remove(+id);
    return this.statusCode(STATUS_CODE.NO_DATA);
  }

  @all('**')
  async methodNotAllowed(@request() request: Request, @response() response: Response) {
    return methodNotAllowed(request, response);
  }
}
