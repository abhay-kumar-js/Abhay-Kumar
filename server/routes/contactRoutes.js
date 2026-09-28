import express from 'express';
import {
  submitMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage,
} from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.route('/')
  .post(contactLimiter, submitMessage)
  .get(protect, adminOnly, getMessages);

router.route('/:id')
  .put(protect, adminOnly, updateMessageStatus)
  .delete(protect, adminOnly, deleteMessage);

export default router;
