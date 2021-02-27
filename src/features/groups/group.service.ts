import { inject, injectable } from 'inversify';

import { DI_TOKEN } from '../../constants';
import { UserRepository } from '../users';

import { GroupService } from './group-service.interface';
import { GroupRepository } from './group-repository.interface';
import { IGroup } from './group.entity';

@injectable()
export class GroupServiceImpl implements GroupService {
  @inject(DI_TOKEN.GroupRepository) private readonly groupRepository: GroupRepository;
  @inject(DI_TOKEN.UserRepository) private readonly userRepository: UserRepository;

  async getById(id: number): Promise<IGroup> {
    return this.groupRepository.getById(id);
  }

  async create(userToCreate: IGroup): Promise<IGroup> {
    return this.groupRepository.create(userToCreate);
  }

  async update(id: number, userToUpdate: IGroup): Promise<void> {
    return this.groupRepository.update(id, userToUpdate);
  }

  async getAll(): Promise<IGroup[]> {
    return this.groupRepository.getAll();
  }

  async remove(id: number): Promise<void> {
    return this.groupRepository.remove(id);
  }

  async addUsersToGroup(groupId: number, userIds: number[]): Promise<void> {
    const foundedUsers = await this.userRepository.getByIds(userIds);
    return this.groupRepository.addUsersToGroup(groupId, foundedUsers);
  }
}
