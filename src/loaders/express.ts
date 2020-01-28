import express, { Express } from 'express';
import cors from 'cors';

import { routes } from '../constants';
import { rootRouter } from '../routers';

export async function expressLoader(app: Express, callback: () => void) {
  app.use(cors());
  app.use(express.json());
  app.use(routes.api, rootRouter);

  callback();
}
