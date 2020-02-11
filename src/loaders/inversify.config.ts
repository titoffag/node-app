import { Container } from 'inversify';
import { getCustomRepository } from 'typeorm';

import { UserRepository, UserRepositoryImpl, UserService, UserServiceImpl } from '../features/users';
import { DI_TOKEN } from '../constants';

export function inversifyLoader(): Container {
  const container = new Container();

  container.bind<UserService>(DI_TOKEN.UserService).to(UserServiceImpl);
  container.bind<UserRepository>(DI_TOKEN.UserRepository).toDynamicValue(() => getCustomRepository(UserRepositoryImpl));

  return container;
}
