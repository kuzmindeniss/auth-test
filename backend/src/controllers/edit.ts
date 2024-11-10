import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { omit } from 'lodash';
import { setAccessTokenCookie } from 'src/helpers/token';
import { validateRequest } from 'src/helpers/validateRequest';
import { UserModel } from 'src/models/UserModel';

export const editExpressValidations = [
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
];

export const edit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  validateRequest(req, res);

  const { firstName, lastName } = req.body;
  const updatedUser = await UserModel.update({ id: req.user.id, firstName, lastName });

  const userWithoutPassword = omit(updatedUser, 'password');
  const accessToken = UserModel.generateAccessToken(userWithoutPassword);

  setAccessTokenCookie(accessToken, res);

  res.send({
    user: userWithoutPassword,
    token: accessToken
  });
};
