import { inject, injectable } from 'inversify';

import { IUser } from '../models/user.model';
import { DI_TOKEN, TRawUser } from '../constants';
import { CrudRepository } from '../repositories/crud.interface';

import { CrudService } from './crud.interface';

@injectable()
export class UserService implements CrudService {
  @inject(DI_TOKEN.UserRepository) private readonly userRepository: CrudRepository;

  async getById(id: string): Promise<IUser> {
    return this.userRepository.getById(id);
  }

  async create(user: TRawUser): Promise<string> {
    return this.userRepository.create(user);
  }

  async update(id: string, updatedUser: TRawUser): Promise<void> {
    return this.userRepository.update(id, updatedUser);
  }

  async getAutoSuggest(loginSubstring: string, limit: number): Promise<IUser[]> {
    return this.userRepository.getAutoSuggest(loginSubstring, limit);
  }

  async remove(id: string): Promise<void> {
    return this.userRepository.remove(id);
  }
}
