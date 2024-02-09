import { Router } from 'express';
import * as UserController from './user.controller';
import { protect } from '../authMiddleware';

const router = Router();

router.get('/', UserController.findAll);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

// protected routes
router.get('/profile', protect, UserController.getProfile);

export default router;