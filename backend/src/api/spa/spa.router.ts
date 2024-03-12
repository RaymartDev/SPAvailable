import { Router } from 'express';
import * as SpaController from './spa.controller';
import { protect } from '../authMiddleware';

const router = Router();

router.get('/control', SpaController.readAllSpa);
router.post('/control', protect, SpaController.createSpa);
router.put('/control', protect, SpaController.updateSpa);
router.delete('/control/:id', protect, SpaController.deleteSpa);

router.get('/control/search', protect, SpaController.readSpa);

export default router;
// ROUTES HERE