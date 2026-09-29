import express from 'express';
import { getGitHubActivity } from '../controllers/githubController.js';

const router = express.Router();

router.get('/', getGitHubActivity);

export default router;
