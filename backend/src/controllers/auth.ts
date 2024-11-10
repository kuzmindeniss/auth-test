import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getAccessTokenFromRequest } from 'src/helpers/token';

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = getAccessTokenFromRequest(req);
  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
      return;
    }
    res.send({ user });
    next();
  });

  next();
};
