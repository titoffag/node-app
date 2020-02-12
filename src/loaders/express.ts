import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import winston from 'winston';
import expressWinston from 'express-winston';

export async function expressLoader(di: Container, callback: () => void) {
  const server = new InversifyExpressServer(di);

  server.setConfig((app: Application) => {
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console(),
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      ),
      msg: "HTTP {{req.method}} {{req.url}}",
    }));

    // app.use(errorHandler({ debug: process.env.ENV !== 'prod', log: true }))
  });

  callback();

  const { PORT = 3001 } = process.env;
  server.build().listen(PORT, () => console.log(`Application listening on port ${PORT}`));
}
