import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { blogAPI } from '../services/api';
import '../styles/BlogDetail.css';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await blogAPI.getBlogById(id);
      setBlog(response.data.blog);
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError(err.response?.data?.message || 'Failed to fetch blog');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      await blogAPI.deleteBlog(id);
      navigate('/blogs');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete blog');
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="blog-detail-container">
        <div className="blog-detail-loading">
          <div className="spinner"></div>
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-detail-container">
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}>
          <button onClick={() => navigate('/blogs')} className="back-btn" style={{ marginBottom: 'var(--space-6)', width: 'auto' }}>
            ← Back to Blogs
          </button>
          <div className="alert alert--error">
            <strong>Error:</strong> {error}
          </div>
          <p>The article could not be loaded. Please try again.</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-detail-container">
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}>
          <button onClick={() => navigate('/blogs')} className="back-btn" style={{ marginBottom: 'var(--space-6)', width: 'auto' }}>
            ← Back to Blogs
          </button>
          <div className="alert alert--error">
            <strong>Not Found:</strong> Article not found
          </div>
          <p>The article you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const isAuthor = user?.id === blog.userId._id;
  const firstLetter = blog.author.charAt(0).toUpperCase();

  return (
    <div className="blog-detail-container">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="blog-detail-header-top">
          <button onClick={() => navigate('/blogs')} className="back-btn">
            ← Back to Blogs
          </button>
        </div>

        <article className="blog-detail-article">
          {blog.image && (
            <div className="blog-detail-hero-image">
              <img src={blog.image} alt={blog.title} />
            </div>
          )}

          <h1 className="blog-detail-title">{blog.title}</h1>

          {blog.content && blog.content.split('\n')[0].length > 100 && (
            <p className="blog-detail-subtitle">
              {blog.content.split('\n')[0].substring(0, 150)}...
            </p>
          )}

          <div className="blog-detail-metadata">
            <div className="blog-detail-author-info">
              <div className="blog-detail-author-avatar">{firstLetter}</div>
              <div className="blog-detail-author-text">
                <div className="blog-detail-author-name">{blog.author}</div>
                <div className="blog-detail-author-date">{formatDate(blog.createdAt)}</div>
              </div>
            </div>
            <span className="blog-detail-category-badge">{blog.category}</span>
          </div>

          <div className="blog-detail-content">
            {blog.content}
          </div>

          {isAuthor && (
            <div className="blog-detail-actions">
              <button onClick={handleEdit} className="edit-btn">
                ✏️ Edit Article
              </button>
              <button onClick={handleDelete} className="delete-btn">
                🗑️ Delete Article
              </button>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
