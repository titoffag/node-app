import { injectable } from 'inversify';
import createError from 'http-errors';
import uuid from 'uuid/v1';

import { IUser, User } from '../models/user.model';
import { STATUS_CODE, TRawUser } from '../constants';
import { isDefined } from '../tools';

import { CrudRepository } from './crud.interface';

let users: IUser[] = [
  new User('3', 'alexander', 'password3', 30, true),
  new User('4', 'max', 'password4', 40, false),
  new User('1', 'maksimko', 'password1', 10, false),
  new User('2', 'maximo', 'password2', 20, false),
  new User('5', 'alex', 'password5', 50, false),
];

@injectable()
export class UserRepository implements CrudRepository {
  async getById(id: string): Promise<IUser> {
    const foundUser = users.find(user => user.id === id);

    if (!isDefined(foundUser)) {
      throw createError(STATUS_CODE.NOT_FOUND, 'Oops! Cannot found user by given id');
    }

    return foundUser;
  }

  async create(user: TRawUser): Promise<string> {
    const id = uuid().replace(/-/g, '');
    const { login, password, age } = user;
    const defaultIsDeleted = false;

    const newUser = new User(id, login, password, age, defaultIsDeleted);
    users.push(newUser);

    return id;
  }

  async update(id: string, updatedUser: TRawUser): Promise<void> {
    users = users.map(user => {
      if (user.id === id) {
        const { login, password, age } = updatedUser;
        const defaultIsDeleted = false;

        return new User(id, login, password, age, defaultIsDeleted);
      }

      return user;
    });
  }

  async getAutoSuggest(loginSubstring: string, limit: number): Promise<IUser[]> {
    const byLoginProperty = (user: IUser, nextUser: IUser) =>
      user.login.toLowerCase() >= nextUser.login.toLowerCase() ? 1 : -1;
    const byLoginSubstring = (user: IUser) => user.login.includes(loginSubstring);

    return users
      .sort(byLoginProperty)
      .filter(byLoginSubstring)
      .slice(0, limit);
  }

  async remove(id: string): Promise<void> {
    users = users.map(user => {
      if (user.id === id) {
        user.isDeleted = true;
      }

      return user;
    });
  }
}
