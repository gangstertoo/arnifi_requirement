import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
  try {
    const blogs = await Blog.find().select('_id updatedAt createdAt');
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add static pages
    const staticPages = [
      { loc: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: '1.0' },
      { loc: '/blogs', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: '0.9' },
    ];
    
    staticPages.forEach(page => {
      xml += '  <url>\n';
      xml += `    <loc>${process.env.CLIENT_URL || 'http://localhost:3000'}${page.loc}</loc>\n`;
      xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += '  </url>\n';
    });
    
    // Add blog pages
    blogs.forEach(blog => {
      const lastmod = (blog.updatedAt || blog.createdAt).toISOString().split('T')[0];
      xml += '  <url>\n';
      xml += `    <loc>${process.env.CLIENT_URL || 'http://localhost:3000'}/blog/${blog._id}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    res.status(500).json({ message: 'Error generating sitemap', error: error.message });
  }
});

export default router;
