import express from 'express';
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, adminOnly, createProject);

router.route('/:slug')
  .get(getProjectBySlug);

router.route('/:id')
  .put(protect, adminOnly, updateProject)
  .delete(protect, adminOnly, deleteProject);

export default router;
