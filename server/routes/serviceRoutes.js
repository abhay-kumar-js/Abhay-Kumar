import express from 'express';
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getServices)
  .post(protect, adminOnly, createService);

router.route('/:id')
  .put(protect, adminOnly, updateService)
  .delete(protect, adminOnly, deleteService);

export default router;
