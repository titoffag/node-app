import express from 'express';
import dotenv from 'dotenv';

import { User, IUser } from './models/user';

const app = express();
dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, DB_NAME, DB_PORT, APP_PORT } = process.env;

const user: IUser = new User('1', 'login', 'password', 20, false);

app.get('/', (req, res) =>
  res.send(
    `Hello World! ${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}:${DB_PORT}/${DB_NAME}`,
  ),
);
app.listen(APP_PORT, () => console.log(`Example app listening on port 3000! ${user.toString()}`));
