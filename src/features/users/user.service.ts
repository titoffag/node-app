import { inject, injectable } from 'inversify';

import { DI_TOKEN } from '../../constants';

import { UserService } from './user-service.interface';
import { UserRepository } from './user-repository.interface';
import { IUser } from './user.entity';

@injectable()
export class UserServiceImpl implements UserService {
  @inject(DI_TOKEN.UserRepository) private readonly userRepository: UserRepository;

  async getById(id: number): Promise<IUser> {
    return this.userRepository.getById(id);
  }

  async create(userToCreate: IUser): Promise<number> {
    return this.userRepository.create(userToCreate);
  }

  async update(id: number, userToUpdate: IUser): Promise<void> {
    return this.userRepository.update(id, userToUpdate);
  }

  async getAutoSuggest(loginSubstring: string, limit: number): Promise<IUser[]> {
    return this.userRepository.getAutoSuggest(loginSubstring, limit);
  }

  async remove(id: number): Promise<void> {
    return this.userRepository.softRemove(id);
  }
}
