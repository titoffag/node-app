import createError from 'http-errors';
import { AbstractRepository, EntityRepository } from 'typeorm';

import { IUser } from '../users';
import { isDefined } from '../../tools';

import { GroupRepository } from './group-repository.interface';
import { Group, IGroup } from './group.entity';

@EntityRepository(Group)
export class GroupRepositoryImpl extends AbstractRepository<Group> implements GroupRepository {
  async getById(id: number): Promise<IGroup> {
    const foundUser = await this.repository.findOne(id, {
      relations: ['users'],
    });

    if (!isDefined(foundUser)) {
      throw new createError.NotFound('Oops! Cannot found user by given id');
    }

    return foundUser;
  }

  async create(userToCreate: IGroup): Promise<IGroup> {
    const createdUser = await this.repository.save(userToCreate);

    return createdUser;
  }

  async update(id: number, userToUpdate: IGroup): Promise<void> {
    await this.repository.update(id, userToUpdate);
  }

  async getAll(): Promise<IGroup[]> {
    return await this.repository.find({
      relations: ['users'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async addUsersToGroup(groupId: number, users: IUser[]): Promise<void> {
    await this.manager.transaction(async transactionManager => {
      if (users.length === 0) {
        throw new createError.NotFound('Cannot found users by given user ids');
      }

      const group = await this.repository.findOne(groupId);
      if (!isDefined(group)) {
        throw new createError.NotFound('Cannot found group by given group id');
      }

      group.users = users;
      await transactionManager.save(group);
    });
  }
}
