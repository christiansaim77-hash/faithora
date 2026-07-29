import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwt';
import { AppDataSource } from '../../database';
import { User } from '../../database/entities/User';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; name?: string; email: string } | null;
    }
  }
}

export async function authenticateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
      const err: any = new Error('Authorization token required');
      err.status = 401;
      throw err;
    }
    const token = auth.slice(7).trim();
    let payload: any;
    try {
      payload = verifyToken(token) as any;
    } catch (e) {
      const err: any = new Error('Invalid token');
      err.status = 401;
      throw err;
    }

    if (!payload || !payload.userId) {
      const err: any = new Error('Invalid token payload');
      err.status = 401;
      throw err;
    }

    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { id: payload.userId } });
    if (!user) {
      const err: any = new Error('User not found');
      err.status = 401;
      throw err;
    }

    req.user = { id: user.id, name: (user as any).name || user.displayName, email: user.email };
    next();
  } catch (err) {
    next(err);
  }
}
