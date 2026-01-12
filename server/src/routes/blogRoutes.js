import express from 'express';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getUserBlogs
} from '../controllers/blogController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public read-only routes (no authentication required)
router.get('/user/my-blogs', authenticateToken, getUserBlogs);
router.get('/:id', getBlogById);
router.get('/', getAllBlogs);

// Protected write operations (require authentication)
router.post('/', authenticateToken, createBlog);
router.put('/:id', authenticateToken, updateBlog);
router.delete('/:id', authenticateToken, deleteBlog);

export default router;
