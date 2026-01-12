import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import sitemapRoutes from './routes/sitemapRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// API Routes
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);
app.use('/', sitemapRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Serve static files from the frontend build
const distPath = path.join(__dirname, '../../client/dist');
app.use(express.static(distPath));

// SPA fallback - serve index.html for all non-API routes
app.use((req, res) => {
  // If it's an API route (starts with /auth, /blogs, etc), return 404
  if (req.path.startsWith('/auth') || req.path.startsWith('/blogs')) {
    return res.status(404).json({ message: 'Route not found' });
  }
  // For all other routes, serve index.html (SPA routing)
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
