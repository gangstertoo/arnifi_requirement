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
      console.log('Fetching blog with ID:', id);
      const response = await blogAPI.getBlogById(id);
      console.log('Blog response:', response);
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
          <p>Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-detail-container">
        <button onClick={() => navigate('/blogs')} className="back-btn">
          ← Back to Blogs
        </button>
        <div className="alert alert--error">
          <strong>Error:</strong> {error}
        </div>
        <p>The blog could not be loaded. Please try again.</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-detail-container">
        <button onClick={() => navigate('/blogs')} className="back-btn">
          ← Back to Blogs
        </button>
        <div className="alert alert--error">
          <strong>Not Found:</strong> Blog not found
        </div>
        <p>The blog you're looking for doesn't exist.</p>
      </div>
    );
  }

  const isAuthor = user?.id === blog.userId._id;

  return (
    <div className="blog-detail-container">
      <button onClick={() => navigate('/blogs')} className="back-btn">
        ← Back to Blogs
      </button>

      <article className="blog-detail">
        {blog.image && (
          <div className="blog-detail-image">
            <img src={blog.image} alt={blog.title} />
          </div>
        )}

        <div className="blog-detail-header">
          <h1 className="blog-detail-title">{blog.title}</h1>
          
          <div className="blog-detail-metadata">
            <span className="blog-detail-author">By {blog.author}</span>
            <span className="blog-detail-category">{blog.category}</span>
            <span className="blog-detail-date">{formatDate(blog.createdAt)}</span>
          </div>
        </div>

        <div className="blog-detail-content">
          {blog.content}
        </div>

        {isAuthor && (
          <div className="blog-detail-actions">
            <button onClick={handleEdit} className="edit-btn">
              Edit Blog
            </button>
            <button onClick={handleDelete} className="delete-btn">
              Delete Blog
            </button>
          </div>
        )}
      </article>
    </div>
  );
}
