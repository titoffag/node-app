import { IUser } from '../models/user.model';
import { TRawUser } from '../constants';

export interface CrudService {
  getById(id: string): Promise<IUser>;

  create(user: TRawUser): Promise<string>;

  update(id: string, updatedUser: TRawUser): Promise<void>;

  getAutoSuggest(loginSubstring: string, limit: number): Promise<IUser[]>;

  remove(id: string): Promise<void>;
}
