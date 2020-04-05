import { IUser } from './user.entity';

export interface UserService {
  getById(id: number): Promise<IUser>;

  create(objectToCreate: IUser): Promise<IUser>;

  update(id: number, objectToUpdate: IUser): Promise<void>;

  getAutoSuggest(loginSubstring: string, limit: number): Promise<IUser[]>;

  remove(id: number): Promise<void>;
}
