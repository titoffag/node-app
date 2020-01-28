import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { STATUS_CODE, TRawUser } from '../constants';
import { CrudService } from '../services/crud.interface';

import { CrudController } from './crud.interface';

@injectable()
export class UserController implements CrudController {
  @inject('CrudService') private userService: CrudService;

  async create(request: Request, response: Response) {
    const { login, password, age } = request.body;

    try {
      const user: TRawUser = {
        login,
        password,
        age,
      };
      const id = await this.userService.create(user);
      response.location(`/api/users/${id}`).sendStatus(STATUS_CODE.CREATED);
    } catch (error) {
      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }
  }

  async getAutoSuggest(request: Request, response: Response) {
    const { loginSubstring = '', limit = 5 } = request.query;

    try {
      const suggestedUsers = await this.userService.getAutoSuggest(loginSubstring, +limit);
      response.status(STATUS_CODE.OK).json(suggestedUsers);
    } catch (error) {
      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const user = await this.userService.getById(id);
      response.status(STATUS_CODE.OK).json(user);
    } catch (error) {
      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { login, password, age } = request.body;

    try {
      const user: TRawUser = {
        login,
        password,
        age,
      };

      await this.userService.update(id, user);
      response.sendStatus(STATUS_CODE.NO_DATA);
    } catch (error) {
      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await this.userService.remove(id);
      response.sendStatus(STATUS_CODE.NO_DATA);
    } catch (error) {
      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }
  }
}
