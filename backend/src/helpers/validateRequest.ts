import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(422).send({ errors: result.array() });
    return;
  }
};
