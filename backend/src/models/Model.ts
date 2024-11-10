import { db } from 'src/db';

export abstract class Model {
  protected static tableName?: string;

  protected static get table() {
    if (!this.tableName) {
      throw new Error('The table name must be defined for the model.');
    }
    return db(this.tableName);
  }
}
