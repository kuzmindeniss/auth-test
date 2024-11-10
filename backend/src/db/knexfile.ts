import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '/../../.env'})

import type { Knex } from "knex";

module.exports = {
  development: {
    client: "pg",
    connection: 'postgres://test_auth:test_auth@postgres:5432/users',
    migrations: {
      directory: './migrations',
      extension: 'ts'
    },
    seeds: {
      directory: './seeds',
      extension: 'ts'
    }
  } as Knex.Config
};
