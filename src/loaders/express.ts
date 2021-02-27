import express, { Application, ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

import { logHandler } from '../middlewares';

export async function expressLoader(di: Container) {
  const server = new InversifyExpressServer(di);

  server.setConfig((app: Application) => {
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(compression());

    app.use(logHandler);
  });

  const { PORT = 3001 } = process.env;
  server.build().listen(PORT, () => console.log(`Application listening on port ${PORT}`));
}
