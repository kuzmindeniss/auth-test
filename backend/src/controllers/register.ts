import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { db } from 'src/db';
import { setAccessTokenCookie } from 'src/helpers/token';
import { validateRequest } from 'src/helpers/validateRequest';
import { UserModel } from 'src/models/UserModel';

const checkIfLoginNotInUse = async (login: string) => {
  const user = await db('users').where({ login }).first();
  if (user) {
    throw new Error('Login already in use')
  };
};

export const registerExpressValidations = [
  body('password').notEmpty(),
  body('login').notEmpty().custom(checkIfLoginNotInUse)
];

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  validateRequest(req, res);

  const { login, password, firstName, lastName } = req.body;
  const { id } = await UserModel.insert({ login, password, firstName, lastName });

  const userWithoutPassword = { id, login, firstName, lastName };
  const accessToken = UserModel.generateAccessToken(userWithoutPassword);

  setAccessTokenCookie(accessToken, res);

  res.send({
    user: userWithoutPassword,
    token: accessToken
  });
  next();
};
