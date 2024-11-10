import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', table =>  {
      table.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());
      table.string('login', 255).unique().notNullable();
      table.string('firstName', 255).notNullable();
      table.string('lastName', 255).notNullable();
      table.string('password', 255);
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('users');
}

