import { Container } from 'inversify';
import 'reflect-metadata';

import { CrudController } from './controllers/crud.interface';
import { UserController } from './controllers/user.controller';
import { CrudService } from './services/crud.interface';
import { UserService } from './services/user.service';
import { CrudRepository } from './repositories/crud.interface';
import { UserRepository } from './repositories/user.repository';

export const container = new Container();
export enum DiToken {
  CrudController = 'CrudController',
  CrudService = 'CrudService',
  CrudRepository = 'CrudRepository',
}

container.bind<CrudController>(DiToken.CrudController).to(UserController);
container.bind<CrudService>(DiToken.CrudService).to(UserService);
container.bind<CrudRepository>(DiToken.CrudRepository).to(UserRepository);
