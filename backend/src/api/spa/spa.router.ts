import { Router } from 'express';
import * as SpaController from './spa.controller';
import { protect } from '../authMiddleware';

const router = Router();

router.route('/control')
  .get(protect, SpaController.readAllSpa)
  .post(protect, SpaController.createSpa)
  .put(protect, SpaController.updateSpa)
  .delete(protect, SpaController.deleteSpa);

router.get('/control/search', protect, SpaController.readSpa);

export default router;
// ROUTES HERE