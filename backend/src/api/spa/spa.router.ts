import { Router } from 'express';
import * as SpaController from './spa.controller';
import { protect } from '../authMiddleware';
import { prismaFetch } from '../../prisma';
import { PrismaClient } from '@prisma/client';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const spaList = await prismaFetch(async (prisma : PrismaClient) => {
      try {
        return await prisma.spa.findMany({
          orderBy: {
            updated_at: 'desc',
          },
          include: {
            owner: true,
          },
        });
      } catch (err) {
        next(err);
      }
    }, next);
    
    if (spaList) {
      res.status(200).json(spaList);
    } else {
      res.status(400);
      next(new Error('Something went wrong'));
    }
  } catch (err) {
    next(err);
  }
});
router.post('/control', protect, SpaController.createSpa);
router.put('/control', protect, SpaController.updateSpa);
router.delete('/control/:id', protect, SpaController.deleteSpa);

router.get('/control/search', protect, SpaController.readSpa);

export default router;
// ROUTES HERE