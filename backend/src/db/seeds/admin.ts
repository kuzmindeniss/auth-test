import { Knex } from "knex";
import { hash } from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: knex.fn.uuid(),
      login: 'admin',
      password: hash('admin', 10),
      firstName: 'Админ',
      lastName: 'Админович'
    },
  ]);
};
