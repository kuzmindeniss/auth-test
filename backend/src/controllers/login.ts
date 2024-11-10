import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { UserModel } from 'src/models/UserModel';
import omit from 'lodash/omit';
import { setAccessTokenCookie } from 'src/helpers/token';
import { validateRequest } from 'src/helpers/validateRequest';

export const loginValidations = [
  body('login').notEmpty(),
  body('password').notEmpty()
]

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  validateRequest(req, res);

  const { login, password } = req.body;

  const user = await UserModel.findByLogin(login);

  if (!user || !UserModel.comparePassword(password, user.password)) {
    res.status(401).send({ errors: [{ path: 'login', msg: 'You entered an incorrect login or password.' }] });
    return;
  }

  const userWithoutPassword = omit(user, 'password');
  const accessToken = UserModel.generateAccessToken(userWithoutPassword);

  setAccessTokenCookie(accessToken, res);

  res.send({
    user: userWithoutPassword,
    token: accessToken
  });
  next();
};
