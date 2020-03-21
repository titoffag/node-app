import { IUser } from './user.entity';

export interface UserRepository {
  getById(id: number): Promise<any>;

  create(entityToCreate: IUser): Promise<number>;

  update(id: number, entityToUpdate: IUser): Promise<void>;

  getAutoSuggest(loginSubstring: string, limit: number): Promise<IUser[]>;

  getByIds(userIds: number[]): Promise<IUser[]>;

  softRemove(id: number): Promise<void>;

  hardRemove(id: number): Promise<void>;
}
