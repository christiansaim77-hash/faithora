import AppDataSource from './data-source';
import { User } from './entities/User';
import { Post } from './entities/Post';
import { PrayerRequest } from './entities/PrayerRequest';
import { Group } from './entities/Group';
import { Message } from './entities/Message';

export { AppDataSource, User, Post, PrayerRequest, Group, Message };

export async function initializeDatabase(): Promise<void> {
  try {
    await AppDataSource.initialize();
    // Optionally run migrations here:
    // await AppDataSource.runMigrations();
    // eslint-disable-next-line no-console
    console.log('Database initialized');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Database initialization failed', err);
    throw err;
  }
}
