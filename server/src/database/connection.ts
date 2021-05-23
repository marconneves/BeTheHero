import knex from 'knex';
import configuration from '../config/knexfile';

let config = {} as knex.Config;

if(process.env.NODE_ENV === 'production'){
    config = configuration.production;
} else if(process.env.NODE_ENV === 'test'){
    config = configuration.test;
} else {
    config = configuration.development;
}

const connection = knex(config);

export default connection;