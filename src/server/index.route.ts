import 'reflect-metadata';
import { Router } from 'express';
import UserRoute from './routes/user.route';
import AuthRoute from './routes/auth.route';
import passport from 'passport';

const router = Router(); 

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (_req, res) =>
  res.json('OK')
);

router.get('/', (_req, res) => res.json('Welcome'))

router.use('/', AuthRoute);

// mount user routes at /users
router.use('/users', passport.authenticate('jwt', { session: false }), UserRoute);

export default  router;
