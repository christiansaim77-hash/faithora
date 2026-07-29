import { authRoutes } from './modules/auth/routes';
import { userRoutes } from './modules/users/routes';
import { postRoutes } from './modules/posts/routes';
import { prayerRoutes } from './modules/prayer/routes';
import { bibleRoutes } from './modules/bible/routes';
import { groupRoutes } from './modules/groups/routes';
import apiRouter from './routes/api';
import { messagingRoutes } from './modules/messaging/routes';app.get('/api/v1/modules', (req, res) => {
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

app.use('/api/v1', apiRouter);
