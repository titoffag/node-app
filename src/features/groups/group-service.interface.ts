import { IGroup } from './group.entity';

export interface GroupService {
  getById(id: number): Promise<IGroup>;

  create(objectToCreate: IGroup): Promise<number>;

  update(id: number, objectToUpdate: IGroup): Promise<void>;

  getAll(): Promise<IGroup[]>;

  remove(id: number): Promise<void>;

  addUsersToGroup(groupId: number, userIds: number[]): Promise<void>;
}
