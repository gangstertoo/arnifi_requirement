import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import BlogCard from '../components/BlogCard';
import '../styles/MyBlogs.css';

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  const fetchUserBlogs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await blogAPI.getUserBlogs();
      setBlogs(response.data.blogs);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch your blogs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-blogs-container">
      <div className="my-blogs-header">
        <h1>My Blogs</h1>
        <Link to="/create" className="create-btn">
          Create New Blog
        </Link>
      </div>

      {error && <div className="alert alert--error">{error}</div>}

      {loading ? (
        <div className="loading">Loading your blogs...</div>
      ) : blogs.length === 0 ? (
        <div className="no-blogs">
          <p>You haven't created any blogs yet.</p>
          <Link to="/create" className="create-link">
            Create your first blog
          </Link>
        </div>
      ) : (
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} onDelete={fetchUserBlogs} isMyBlog={true} />
          ))}
        </div>
      )}
    </div>
  );
}
