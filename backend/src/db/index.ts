import knex from 'knex';
const knexConfig = require('./knexfile');

export const db = knex(knexConfig.development);
