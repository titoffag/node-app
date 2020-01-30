import { IUser, User } from '../users/user.entity';

export interface CrudService {
  getById(id: number): Promise<IUser>;

  create(userToCreate: User): Promise<number>;

  update(id: number, userToUpdate: User): Promise<void>;

  getAutoSuggest(loginSubstring: string, limit: number): Promise<IUser[]>;

  remove(id: number): Promise<void>;
}
