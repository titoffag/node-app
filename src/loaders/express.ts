import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import morgan from 'morgan';

export async function expressLoader(di: Container, callback: (port: number) => void) {
  const server = new InversifyExpressServer(di);

  server.setConfig((app: Application) => {
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

    // app.use(errorHandler({ debug: process.env.ENV !== 'prod', log: true }))
  });

  const { PORT = 3001 } = process.env;
  server.build().listen(PORT, () => callback(+PORT));
}
