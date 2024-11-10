import { Response, Request } from 'express';

export const getAccessTokenFromRequest = (req: Request) => {
  const authHeader = req.headers['authorization']
  return authHeader && authHeader.split(' ')[1];
};

export const setAccessTokenCookie = (token: string, res: Response) => {
  res.cookie('accessToken', token, { maxAge: 60 * 1000 * 60 * 24 });
};
