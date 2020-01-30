import { IUser } from '../entities/user.entity';
import { TRawUser } from '../constants';

export interface CrudRepository {
  getById(id: number): Promise<IUser>;

  create(user: TRawUser): Promise<number>;

  update(id: number, updatedUser: TRawUser): Promise<void>;

  getAutoSuggest(loginSubstring: string, limit: number): Promise<IUser[]>;

  remove(id: number): Promise<void>;
}
