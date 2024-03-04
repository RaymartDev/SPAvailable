import { Router } from 'express';
import * as SpaController from './spa.controller';
import { protect } from '../authMiddleware';

const router = Router();

router.route('/spa')
  .get(protect, SpaController.readAllSpa)
  .post(protect, SpaController.createSpa)
  .put(protect, SpaController.updateSpa)
  .delete(protect, SpaController.deleteSpa);

router.get('/spa/search', protect, SpaController.readSpa);
// ROUTES HERE