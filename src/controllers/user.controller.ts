import { Request, Response } from 'express';

import { STATUS_CODE } from '../constants';
import { UserService } from '../services/user.service';

export class UserController {
  static async create(request: Request, response: Response) {
    const newUser = request.body;

    try {
      await UserService.create(newUser);
      response.status(STATUS_CODE.CREATED).json();
      // TODO: Add location header to response
    } catch (error) {
      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }
  }

  static async getAutoSuggest(request: Request, response: Response) {
    const { loginSubstring, limit } = request.params;

    try {
      const suggestedUsers = await UserService.getAutoSuggest(loginSubstring, limit);
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
    const updatedUser = request.body;

    try {
      await UserService.update(updatedUser);
      response.status(STATUS_CODE.NO_DATA).json();
    } catch (error) {
      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }
  }

  static async remove(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await UserService.remove(id);
      response.status(STATUS_CODE.NO_DATA).json();
    } catch (error) {
      response.status(STATUS_CODE.BAD_REQUEST).json({ error: error.message });
    }
  }
}
