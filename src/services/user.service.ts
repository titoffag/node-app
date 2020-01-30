import { inject, injectable } from 'inversify';

import { IUser } from '../entities/user.entity';
import { DI_TOKEN, TRawUser } from '../constants';
import { CrudRepository } from '../repositories/crud.interface';

import { CrudService } from './crud.interface';

@injectable()
export class UserService implements CrudService {
  @inject(DI_TOKEN.UserRepository) private readonly userRepository: CrudRepository;

  async getById(id: number): Promise<IUser> {
    return this.userRepository.getById(id);
  }

  async create(user: TRawUser): Promise<number> {
    return this.userRepository.create(user);
  }

  async update(id: number, updatedUser: TRawUser): Promise<void> {
    return this.userRepository.update(id, updatedUser);
  }

  async getAutoSuggest(loginSubstring: string, limit: number): Promise<IUser[]> {
    return this.userRepository.getAutoSuggest(loginSubstring, limit);
  }

  async remove(id: number): Promise<void> {
    return this.userRepository.remove(id);
  }
}
