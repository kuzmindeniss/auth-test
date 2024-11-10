import { User } from 'src/types';
import { Model } from './Model';
import jwt from 'jsonwebtoken';
import omit from 'lodash/omit';
import { compare, hash } from 'bcryptjs';

const SALT_ROUND = 10;

export class UserModel extends Model {
  protected static tableName = 'users';

  public static async findByLogin(login: string): Promise<User | null> {
    return this.table.where({ login }).select('*').first();
  }

  public static async insert(user: Omit<User, 'id'>): Promise<{
    id: string;
  }> {
    const [result] = await this.table
      .insert({ ...user, password: this.hashPassword(user.password) })
      .returning('id');
    return result;
  }

  public static async update(user: Pick<User, 'id' | 'firstName' | 'lastName'>): Promise<User> {
    const [result] = await this.table
      .where({ id: user.id })
      .update(omit(user, 'id'))
      .returning('*');
    return result;
  }

  public static comparePassword(password: string, hashedPassword: string) {
    return compare(password, hashedPassword)
  }

  public static async hashPassword(password: string) {
    return await hash(password, SALT_ROUND)
  }

  public static generateAccessToken(user: Omit<User, 'password'>) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
  }
}
