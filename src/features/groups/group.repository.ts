import createError from 'http-errors';
import { AbstractRepository, EntityRepository } from 'typeorm';

import { STATUS_CODE } from '../../constants';
import { IUser } from '../users';
import { isDefined } from '../../tools';

import { GroupRepository } from './group-repository.interface';
import { Group, IGroup } from './group.entity';

@EntityRepository(Group)
export class GroupRepositoryImpl extends AbstractRepository<Group> implements GroupRepository {
  async getById(id: number): Promise<IGroup> {
    const foundUser = await this.repository.findOne(id);

    if (!isDefined(foundUser)) {
      throw createError(STATUS_CODE.NOT_FOUND, 'Oops! Cannot found user by given id');
    }

    return foundUser;
  }

  async create(userToCreate: IGroup): Promise<number> {
    const createdUser = await this.repository.save(userToCreate);

    return createdUser.id;
  }

  async update(id: number, userToUpdate: IGroup): Promise<void> {
    await this.repository.update(id, userToUpdate);
  }

  async getAll(): Promise<IGroup[]> {
    return await this.repository.find();
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async addUsersToGroup(groupId: number, users: IUser[]): Promise<void> {
    // todo: 1 sql select
    await this.manager.transaction(async transactionManager => {
      if (users.length === 0) {
        throw new Error('Cannot found users by given user ids');
      }

      const group = await this.repository.findOne(groupId);
      if (!isDefined(group)) {
        throw new Error('Cannot found group by given group id');
      }

      group.users = users;
      await transactionManager.save(group);
    });
  }
}
