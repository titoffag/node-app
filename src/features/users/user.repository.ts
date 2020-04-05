import createError from 'http-errors';
import { AbstractRepository, EntityRepository, Like } from 'typeorm';

import { isDefined } from '../../tools';

import { UserRepository } from './user-repository.interface';
import { IUser, User } from './user.entity';

@EntityRepository(User)
export class UserRepositoryImpl extends AbstractRepository<User> implements UserRepository {
  async getById(id: number): Promise<IUser> {
    const foundUser = await this.repository.findOne(id);

    if (!isDefined(foundUser)) {
      throw new createError.NotFound('Oops! Cannot found user by given id');
    }

    return foundUser;
  }

  async create(userToCreate: IUser): Promise<IUser> {
    const createdUser = await this.repository.save(userToCreate);

    return createdUser;
  }

  async update(id: number, userToUpdate: IUser): Promise<void> {
    await this.repository.update(id, userToUpdate);
  }

  async getAutoSuggest(loginSubstring: string, limit: number): Promise<IUser[]> {
    const users = await this.repository.find({
      where: { login: Like(`%${loginSubstring}%`) },
      order: { login: 'ASC' },
      take: limit,
    });

    return users;
  }

  async getByIds(userIds: number[]): Promise<IUser[]> {
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
