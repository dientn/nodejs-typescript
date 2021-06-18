import { Router } from 'express';
import passport from 'passport';
import Container from 'typedi';
import AuthController from '../controllers/auth.controller';

const router = Router();

const authController:AuthController = Container.get(AuthController)
router.post('/signup', (req, res) => authController.signup(req, res));
router.post('/login', (req, res) => authController.login(req, res));
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => authController.profile(req, res));

export default router;