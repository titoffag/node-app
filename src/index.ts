import 'reflect-metadata';
import express, { Application } from 'express';
import expressJoi from 'express-joi-validation';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import cors from 'cors';
import helmet from 'helmet';

import { DI_TOKEN } from './constants';
import { CrudService } from './services/crud.interface';
import { UserService } from './services/user.service';
import { CrudRepository } from './repositories/crud.interface';
import { UserRepository } from './repositories/user.repository';

export const validator = expressJoi.createValidator();

import './controllers/user.controller';

export const container = new Container();
container.bind<CrudService>(DI_TOKEN.UserService).to(UserService);
container.bind<CrudRepository>(DI_TOKEN.UserRepository).to(UserRepository);

const server = new InversifyExpressServer(container);

server.setConfig((app: Application) => {
  app.use(cors());
  app.use(express.json());
  app.use(helmet());
});

const port = process.env.APP_PORT || 9002;
const instanceServer = server
  .build()
  .listen(port, () => console.log(`Application listening on port ${port}`));
process.on('uncaughtException', () => instanceServer.close());
