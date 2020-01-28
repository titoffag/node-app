import express from 'express';
import dotenv from 'dotenv';

import { rootRouter } from './routes';
import { routes } from './constants';

const app = express();
dotenv.config();

const { APP_PORT } = process.env;

app.use(routes.api, rootRouter);
app.listen(APP_PORT, () => console.log(`Application listening on port ${APP_PORT}`));
