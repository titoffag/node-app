import { IUser } from '../users';

import { IGroup } from './group.entity';

export interface GroupRepository {
  getById(id: number): Promise<any>;

  create(entityToCreate: IGroup): Promise<number>;

  update(id: number, entityToUpdate: IGroup): Promise<void>;

  getAll(): Promise<any[]>;

  remove(id: number): Promise<void>;

  addUsersToGroup(groupId: number, users: IUser[]): Promise<void>;
}