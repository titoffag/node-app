import createError from 'http-errors';
import { AbstractRepository, EntityRepository } from 'typeorm';

import { STATUS_CODE } from '../../constants';
import { isDefined } from '../../tools';

import { UserRepository } from './user-repository.interface';
import { IUser, User } from './user.entity';

@EntityRepository(User)
export class UserRepositoryImpl extends AbstractRepository<User> implements UserRepository {
  async getById(id: number): Promise<IUser> {
    const foundUser = await this.repository.findOne(id);

    if (!isDefined(foundUser)) {
      throw createError(STATUS_CODE.NOT_FOUND, 'Oops! Cannot found user by given id');
    }

    return foundUser;
  }

  async create(userToCreate: IUser): Promise<number> {
    const createdUser = await this.repository.save(userToCreate);

    return createdUser.id;
  }

  async update(id: number, userToUpdate: IUser): Promise<void> {
    await this.repository.update(id, userToUpdate);
  }

  async getAutoSuggest(loginSubstring: string, limit: number): Promise<IUser[]> {
    const byLoginProperty = (user: IUser, nextUser: IUser) =>
      user.login.toLowerCase() >= nextUser.login.toLowerCase() ? 1 : -1;
    const byLoginSubstring = (user: IUser) => user.login.includes(loginSubstring);

    const users = await this.repository.find();

    return users
      .sort(byLoginProperty)
      .filter(byLoginSubstring)
      .slice(0, limit);
  }

  async   getByIds(userIds: number[]): Promise<IUser[]> {
    return await this.repository.findByIds(userIds);
  }

  async softRemove(id: number): Promise<void> {
    const user = await this.repository.findOne(id);
    user.isDeleted = true;
    await this.repository.update(id, user);
  }

  async hardRemove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
