import { Sequelize } from 'sequelize';

export async function postgresLoader(callback: () => void) {
  const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, DB_PORT } = process.env;

  const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOSTNAME,
    port: +DB_PORT,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((error: Error) => {
      console.error('Unable to connect to the database:', error);
    });

  callback();
}
