import { IUser } from '../users';

import { IGroup } from './group.entity';

export interface GroupRepository {
  getById(id: number): Promise<IGroup>;

  create(entityToCreate: IGroup): Promise<IGroup>;

  update(id: number, entityToUpdate: IGroup): Promise<void>;

  getAll(): Promise<IGroup[]>;

  remove(id: number): Promise<void>;

  addUsersToGroup(groupId: number, users: IUser[]): Promise<void>;
}
