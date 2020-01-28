import createError from 'http-errors';

import { IUser, User } from '../models/user';
import { STATUS_CODE } from '../constants';

const users: IUser[] = [
  new User('1', 'login1', 'password1', 10, false),
  new User('2', 'login2', 'password2', 20, false),
  new User('3', 'login3', 'password3', 30, true),
  new User('4', 'login4', 'password4', 40, false),
  new User('5', 'login5', 'password5', 50, false),
];

export class UserService {
  static async getById(id: string): Promise<IUser> {
    const foundUser = users.find(user => user.id === id);

    if (foundUser === undefined) {
      throw createError(STATUS_CODE.NOT_FOUND, 'Oops! Cannot found user by given id');
    }

    return foundUser;
  }

  static async create(user: IUser): Promise<IUser> {
    return users[0];
  }

  static async update(user: IUser): Promise<IUser> {
    return users[0];
  }

  static async getAutoSuggest(loginSubstring: string, limit: string): Promise<IUser[]> {
    return users;
  }

  static async remove(id: string): Promise<IUser[]> {
    return users.map(user => {
      if (user.id === id) {
        user.isDeleted = true;
      }

      return user;
    });
  }
}
