import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { blogAPI } from '../services/api';
import BlogCard from '../components/BlogCard';
import { setMetaTags, clearMetaTags } from '../utils/seo';
import '../styles/Blogs.css';

const CATEGORIES = ['All', 'Career', 'Finance', 'Travel', 'Technology', 'Lifestyle', 'Other'];

export default function Blogs() {
  const { isAuthenticated } = useAuth();
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [authorSearchInput, setAuthorSearchInput] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');

  useEffect(() => {
    fetchBlogs('All', '');
    setMetaTags('All Blogs', 'Discover and read amazing blogs from our community. Filter by category or author.');
    return () => clearMetaTags();
  }, []);

  const fetchBlogs = async (category = 'All', author = '') => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (category !== 'All') {
        params.category = category;
      }
      if (author) {
        params.author = author;
      }

      const response = await blogAPI.getAllBlogs(params);
      setFilteredBlogs(response.data.blogs);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    fetchBlogs(newCategory, authorFilter);
  };

  const handleSearchClick = () => {
    fetchBlogs(selectedCategory, authorSearchInput);
    setAuthorFilter(authorSearchInput);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setAuthorSearchInput('');
    setAuthorFilter('');
    fetchBlogs('All', '');
  };

  useEffect(() => {
    fetchBlogs(selectedCategory, authorFilter);
  }, [selectedCategory, authorFilter]);

  return (
    <div className="blogs-container">
      <div className="blogs-header">
        <h1>All Blogs</h1>
        {isAuthenticated && (
          <Link to="/create" className="create-btn">
            Create New Blog
          </Link>
        )}
      </div>

      {error && <div className="alert alert--error">{error}</div>}

      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="filter-select"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group filter-author-group">
          <label htmlFor="author">Search by Author</label>
          <div className="author-search-wrapper">
            <input
              type="text"
              id="author"
              placeholder="Enter author name..."
              value={authorSearchInput}
              onChange={(e) => setAuthorSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
              className="filter-input"
            />
            <button onClick={handleSearchClick} className="search-btn">
              Search
            </button>
          </div>
        </div>

        {(selectedCategory !== 'All' || authorFilter) && (
          <button onClick={handleResetFilters} className="reset-btn">
            Reset Filters
          </button>
        )}
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
