import { Router } from 'express';
import Container from 'typedi';
import UserController from '../controllers/user.controller';

const router = Router();

const userController:UserController = Container.get(UserController)
// router.get('/:id', getProductById);
router.get('/', (req, res, next) => userController.getAllUsers(req, res, next));
router.post('/', (req, res) => userController.createUser(req, res));
router.get('/:userId', (req, res) => userController.getUserById(req, res));
router.put('/:userId', (req, res) => userController.updateUser(req, res));
router.delete('/:userId', (req, res) => userController.deleteUser(req, res));

export default router;