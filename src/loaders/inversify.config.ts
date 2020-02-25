import { Container } from 'inversify';
import { getCustomRepository } from 'typeorm';

import { UserRepository, UserRepositoryImpl, UserService, UserServiceImpl } from '../features/users';
import { GroupRepository, GroupRepositoryImpl, GroupService, GroupServiceImpl } from '../features/groups';
import { DI_TOKEN } from '../constants';

export function inversifyLoader(): Container {
  const container = new Container();

  container.bind<UserService>(DI_TOKEN.UserService).to(UserServiceImpl);
  container.bind<UserRepository>(DI_TOKEN.UserRepository).toDynamicValue(() => getCustomRepository(UserRepositoryImpl));

  container.bind<GroupService>(DI_TOKEN.GroupService).to(GroupServiceImpl);
  container.bind<GroupRepository>(DI_TOKEN.GroupRepository).toDynamicValue(() => getCustomRepository(GroupRepositoryImpl));

  return container;
} 
