// Update with your config settings.
import path from 'path';
import 'dotenv/config';

export default {
  development: {
    migrations: {
        directory: path.resolve(__dirname, '..', 'database', 'migrations')
    },
    client: 'mysql',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE_DEVELOPMENT
    }
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, '..', 'database', 'test.sqlite')
    },
    migrations: {
      directory: path.resolve(__dirname, '..', 'database', 'migrations')
    },
    useNullAsDefault: true,
  },

  production: {
    migrations: {
        directory: path.resolve(__dirname, '..', 'database', 'migrations')
    },
    client: 'mysql',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE_PRODUCTION
    }
  }
};
