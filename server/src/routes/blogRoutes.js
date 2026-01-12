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

// More specific routes first
router.get('/user/my-blogs', authenticateToken, getUserBlogs);
router.get('/:id', authenticateToken, getBlogById);

// General routes after specific ones
router.get('/', authenticateToken, getAllBlogs);
router.post('/', authenticateToken, createBlog);
router.put('/:id', authenticateToken, updateBlog);
router.delete('/:id', authenticateToken, deleteBlog);

export default router;
