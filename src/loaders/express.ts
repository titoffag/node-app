import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

export async function expressLoader(di: Container, callback: () => void) {
  const server = new InversifyExpressServer(di);

  server.setConfig((app: Application) => {
    app.use(cors());
    app.use(express.json());
    app.use(helmet());

    // app.use(errorHandler({ debug: process.env.ENV !== 'prod', log: true }))
  });

  callback();

  const { PORT = 3001 } = process.env;
  server.build().listen(PORT, () => console.log(`Application listening on port ${PORT}`));
}
