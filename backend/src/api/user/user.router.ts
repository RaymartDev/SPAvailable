import { Router } from 'express';
import * as UserController from './user.controller';

const router = Router();

router.get('/', UserController.findAll);

export default router;