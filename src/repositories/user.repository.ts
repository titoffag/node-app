import { injectable } from 'inversify';
import createError from 'http-errors';
import uuid from 'uuid/v1';
import { getRepository } from 'typeorm';

import { TUser } from '../models/user.model';
import { User, IUser } from '../entities/user.entity';
import { STATUS_CODE, TRawUser } from '../constants';
import { isDefined } from '../tools';

import { CrudRepository } from './crud.interface';

let users: IUser[] = [
  new TUser(3, 'alexander', 'password3', 30, true),
  new TUser(4, 'max', 'password4', 40, false),
  new TUser(1, 'maksimko', 'password1', 10, false),
  new TUser(2, 'maximo', 'password2', 20, false),
  new TUser(5, 'alex', 'password5', 50, false),
];

@injectable()
export class UserRepository implements CrudRepository {
  private readonly dataSource = getRepository(User);

  async getById(id: number): Promise<IUser> {
    const foundUser = await this.dataSource.findOne(id);

    if (!isDefined(foundUser)) {
      throw createError(STATUS_CODE.NOT_FOUND, 'Oops! Cannot found user by given id');
    }

    return foundUser;
  }

  async create(user: TRawUser): Promise<number> {
    const id = +(uuid().replace(/-/g, ''));
    const { login, password, age } = user;
    const defaultIsDeleted = false;

    const newUser = new TUser(id, login, password, age, defaultIsDeleted);
    users.push(newUser);

    return id;
  }

  async update(id: number, updatedUser: TRawUser): Promise<void> {
    users = users.map(user => {
      if (user.id === id) {
        const { login, password, age } = updatedUser;
        const defaultIsDeleted = false;

        return new TUser(id, login, password, age, defaultIsDeleted);
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

  async remove(id: number): Promise<void> {
    users = users.map(user => {
      if (user.id === id) {
        user.isDeleted = true;
      }

      return user;
    });
  }
}
