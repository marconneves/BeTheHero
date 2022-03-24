// Update with your config settings.
import path from 'path';
import 'dotenv/config';

export default {
  development: {
    migrations: {
      directory: path.resolve(__dirname, '..', 'database', 'migrations')
    },
    client: 'pg',
    connection: process.env.DATABASE_URL
  },
  production: {
    migrations: {
      directory: path.resolve(__dirname, '..', 'database', 'migrations')
    },
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
