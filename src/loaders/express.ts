import express, { Application, ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import morgan from 'morgan';

import { logHandler, errorHandler } from '../middlewares';

export async function expressLoader(di: Container, callback: (port: number) => void) {
  const server = new InversifyExpressServer(di);

  server.setConfig((app: Application) => {
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(compression());
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

    // app.use(logHandler);
    app.use((request: Request, response: Response, next: NextFunction) => {
      console.log('there', request, response, next);
      next();
      // errorHandler()
    });
  });

  const { PORT = 3001 } = process.env;
  server.build().listen(PORT, () => callback(+PORT));
}
