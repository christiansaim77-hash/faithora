import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import apiRouter from './routes/api';

const app = express();

// Security and parsing middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Modules discovery (keeps previous behavior)
app.get('/api/v1/modules', (req: Request, res: Response) => {
  res.json({
    modules: [
      'auth',
      'users',
      'posts',
      'prayer',
      'bible',
      'groups',
      'messaging'
    ],
    status: 'loaded'
  });
});

// Mount central API router
app.use('/api/v1', apiRouter);

// 404 handler
app.use((req: Request, _res: Response, next: NextFunction) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || 'Internal Server Error'
    }
  });
});

export default app;
