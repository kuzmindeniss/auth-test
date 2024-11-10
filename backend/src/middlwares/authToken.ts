import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { getAccessTokenFromRequest } from 'src/helpers/token';
import jwt from 'jsonwebtoken';
import { User } from 'src/types';

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const token = getAccessTokenFromRequest(req);
  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }

    req.user = user as User;
    next();
  })
}
