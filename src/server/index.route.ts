import 'reflect-metadata';
import { Router } from 'express';
import UserRoute from './routes/user.route';

const router = Router(); 

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (_req, res) =>
  res.json('OK')
);

router.get('/', (_req, res) => res.json('Welcome'))

// mount product routes at /products
router.use('/users', UserRoute);

export default  router;
