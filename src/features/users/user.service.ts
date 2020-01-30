import { inject, injectable } from 'inversify';

import { DI_TOKEN } from '../../constants';
import { CrudRepository } from '../../interfaces/crud-repository.interface';
import { CrudService } from '../../interfaces/crud-service.interface';

import { IUser, User } from './user.entity';

@injectable()
export class UserService implements CrudService {
  @inject(DI_TOKEN.UserRepository) private readonly userRepository: CrudRepository;

  async getById(id: number): Promise<IUser> {
    return this.userRepository.getById(id);
  }

  async create(userToCreate: User): Promise<number> {
    return this.userRepository.create(userToCreate);
  }

  async update(id: number, userToUpdate: User): Promise<void> {
    return this.userRepository.update(id, userToUpdate);
  }

  async getAutoSuggest(loginSubstring: string, limit: number): Promise<IUser[]> {
    return this.userRepository.getAutoSuggest(loginSubstring, limit);
  }

  async remove(id: number): Promise<void> {
    return this.userRepository.softRemove(id);
  }
}
