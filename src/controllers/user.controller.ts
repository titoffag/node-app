import { Request, Response } from 'express';

import { STATUS_CODE, TRawUser } from '../constants';
import { UserService } from '../services/user.service';

export class UserController {
  static async create(request: Request, response: Response) {
    const { login, password, age } = request.body;

    try {
      const user: TRawUser = {
        login,
        password,
        age,
      };
      const id = await UserService.create(user);
      response.location(`/api/users/${id}`).sendStatus(STATUS_CODE.CREATED);
    } catch (error) {
      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }
  }

  static async getAutoSuggest(request: Request, response: Response) {
    const { loginSubstring = '', limit = 5 } = request.query;

    try {
      const suggestedUsers = await UserService.getAutoSuggest(loginSubstring, +limit);
      response.status(STATUS_CODE.OK).json(suggestedUsers);
    } catch (error) {
      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }
  }

  static async getById(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const user = await UserService.getById(id);
      response.status(STATUS_CODE.OK).json(user);
    } catch (error) {
      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }
  }

  static async update(request: Request, response: Response) {
    const { id } = request.params;
    const { login, password, age } = request.body;

    try {
      const user: TRawUser = {
        login,
        password,
        age,
      };

      await UserService.update(id, user);
      response.sendStatus(STATUS_CODE.NO_DATA);
    } catch (error) {
      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }
  }

  static async remove(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await UserService.remove(id);
      response.sendStatus(STATUS_CODE.NO_DATA);
    } catch (error) {
      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }
  }
}
