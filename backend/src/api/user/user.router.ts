import { Router } from 'express';
import * as UserController from './user.controller';
import { protect } from '../authMiddleware';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/login/google', UserController.loginWithGoogle);
router.post('/logout', UserController.logout);

// protected routes
router.route('/profile')
  .get(protect, UserController.getProfile)
  .put(protect, UserController.updateProfile);

router.get('/verify', UserController.verify);
router.get('/resend', protect, UserController.resendVerification);

export default router;