import { Router } from 'express';
import * as UserController from './user.controller';

const router = Router();

router.get('/', UserController.findAll);
router.post('/register', UserController.register);
router.post('/login', UserController.login);

export default router;