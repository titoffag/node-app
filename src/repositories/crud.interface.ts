import { IUser, User } from '../entities/user.entity';

export interface CrudRepository {
  getById(id: number): Promise<IUser>;

  create(userToCreate: User): Promise<number>;

  update(id: number, userToUpdate: User): Promise<void>;

  getAutoSuggest(loginSubstring: string, limit: number): Promise<IUser[]>;

  softRemove(id: number): Promise<void>;

  hardRemove(id: number): Promise<void>;
}
