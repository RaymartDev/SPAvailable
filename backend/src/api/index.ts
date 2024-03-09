import express, { NextFunction, Response } from 'express';
import { protect } from './authMiddleware';
import MessageResponse from '../interfaces/MessageResponse';
import user from './user/user.router';
import spa from './spa/spa.router';
import UserRequest from '../interfaces/user/UserRequest';
import { prismaFetch } from '../prisma';
import { PrismaClient } from '@prisma/client';
import Feedback from '../interfaces/Feedback';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - Version 1 👋🌎🌍🌏',
  });
});

router.use('/user', user);
router.use('/spa', spa);
router.post('/feedback', protect, async (req: UserRequest, res: Response<Feedback>, next: NextFunction) => {
  try {
    if (!req.user) {
      res.status(400);
      next(new Error('User not found'));
      return;
    }

    if (!req.user.active) {
      res.status(404);
      next(new Error('User not yet verified'));
      return;
    }

    const { desc } = req.body;
    if (desc.length <= 10) {
      res.status(400);
      next(new Error('Feedback must have at least ten character'));
      return;
    }

    const feedbackCreated = await prismaFetch(async (prisma : PrismaClient) => {
      try {
        return prisma.feedback.create({
          data: req.body,
        });
      } catch (err) {
        next(err);
      }
    }, next);

    if (feedbackCreated) {
      res.status(200).json(feedbackCreated);
      console.log(feedbackCreated);
    } else {
      res.status(500);
      next(new Error('Feedback creation failed'));
    }
  } catch (err) {
    next(err);
  }
});

export default router;
