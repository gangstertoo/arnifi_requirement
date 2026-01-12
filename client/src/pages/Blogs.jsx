import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import BlogCard from '../components/BlogCard';
import '../styles/Blogs.css';

const CATEGORIES = ['All', 'Career', 'Finance', 'Travel', 'Technology', 'Lifestyle', 'Other'];

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [authorFilter, setAuthorFilter] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await blogAPI.getAllBlogs();
      setBlogs(response.data.blogs);
      setFilteredBlogs(response.data.blogs);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = blogs;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    if (authorFilter) {
      filtered = filtered.filter((blog) =>
        blog.author.toLowerCase().includes(authorFilter.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);
  }, [selectedCategory, authorFilter, blogs]);

  return (
    <div className="blogs-container">
      <div className="blogs-header">
        <h1>All Blogs</h1>
        <Link to="/create" className="create-btn">
          Create New Blog
        </Link>
      </div>

      {error && <div className="alert alert--error">{error}</div>}

      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="author">Search by Author</label>
          <input
            type="text"
            id="author"
            placeholder="Enter author name..."
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading blogs...</div>
      ) : filteredBlogs.length === 0 ? (
        <div className="no-blogs">
          <p>No blogs found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="blogs-grid">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} onDelete={fetchBlogs} />
          ))}
        </div>
      )}
    </div>
  );
}
