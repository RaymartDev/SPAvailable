import { Router } from 'express';
import { protect } from '../authMiddleware';
import * as GeneralController from './general.controller';

const router = Router();

router
  .route('/products')
  .get(protect, GeneralController.getProducts)
  .post(protect, GeneralController.addProduct)
  .delete(protect, GeneralController.deleteProduct);

router
  .route('/services')
  .get(protect, GeneralController.getServices)
  .post(protect, GeneralController.addService)
  .delete(protect, GeneralController.deleteService);

export default router;