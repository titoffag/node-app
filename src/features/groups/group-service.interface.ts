import { IGroup } from './group.entity';

export interface GroupService {
  getById(id: number): Promise<any>;

  create(objectToCreate: IGroup): Promise<number>;

  update(id: number, objectToUpdate: IGroup): Promise<void>;

  getAll(): Promise<any[]>;

  remove(id: number): Promise<void>;

  addUsersToGroup(groupId: number, userIds: number[]): Promise<void>;
}
