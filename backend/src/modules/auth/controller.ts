import { Request, Response, NextFunction } from 'express';
import * as AuthService from './service';

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, phone, password } = req.body;
    const result = await AuthService.signup({ name, email, phone, password });
    res.status(201).json({ success: true, user: result.user, token: result.token });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login({ email, password });
    res.json({ success: true, user: result.user, token: result.token });
  } catch (err) {
    next(err);
  }
}
