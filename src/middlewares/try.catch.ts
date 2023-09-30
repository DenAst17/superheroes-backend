import { Request, Response, NextFunction } from 'express';

const tryCatch =
  (method: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (err) {
      next(err);
    }
  };

export default tryCatch;