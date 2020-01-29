import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';

export async function expressLoader(app: Express, callback: () => void) {
  app.use(cors());
  app.use(express.json());
  app.use(helmet());

  callback();
}
