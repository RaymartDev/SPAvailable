import express from 'express';
import MessageResponse from '../interfaces/MessageResponse';
import user from './user/user.router';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - Version 1 👋🌎🌍🌏',
  });
});

router.use('/user', user);

export default router;
