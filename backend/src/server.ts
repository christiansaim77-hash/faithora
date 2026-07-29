import http from 'http';
import app from './app';
import { initializeDatabase } from './database';

const DEFAULT_PORT = 3000;
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_PORT;

const server = http.createServer(app);

let shuttingDown = false;
const FORCE_KILL_TIMEOUT = 10_000; // ms

function shutdown(reason?: string) {
  if (shuttingDown) return;
  shuttingDown = true;
  // eslint-disable-next-line no-console
  console.log(`Shutting down server${reason ? ` due to ${reason}` : ''}...`);

  server.close((err?: Error) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('Error while closing server:', err);
      process.exit(1);
    }
    // eslint-disable-next-line no-console
    console.log('Server closed cleanly.');
    process.exit(0);
  });

  setTimeout(() => {
    // eslint-disable-next-line no-console
    console.error('Forcing shutdown after timeout');
    process.exit(1);
  }, FORCE_KILL_TIMEOUT).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('unhandledRejection', (reason) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled Rejection:', reason);
  shutdown('unhandledRejection');
});

process.on('uncaughtException', (err: Error) => {
  // eslint-disable-next-line no-console
  console.error('Uncaught Exception:', err);
  shutdown('uncaughtException');
});

async function start() {
  try {
    // 1) Initialize database (must succeed before listening)
    await initializeDatabase();

    // 2) Start the server
    server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`FAITHORA server listening on port ${port} (NODE_ENV=${process.env.NODE_ENV || 'development'})`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server due to DB init failure', err);
    process.exit(1);
  }
}

start();
