import { IUser } from './user.entity';

export interface UserService {
  getById(id: number): Promise<any>;

  create(objectToCreate: IUser): Promise<number>;

  update(id: number, objectToUpdate: IUser): Promise<void>;

  getAutoSuggest(loginSubstring: string, limit: number): Promise<any[]>;

  remove(id: number): Promise<void>;
}
