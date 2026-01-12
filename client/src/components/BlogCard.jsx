import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { blogAPI } from '../services/api';
import '../styles/BlogCard.css';

export default function BlogCard({ blog, onDelete, isMyBlog = false }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAuthor = user?.id === blog.userId._id;

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      await blogAPI.deleteBlog(blog._id);
      onDelete();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete blog');
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${blog._id}`);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="blog-card">
      {blog.image && (
        <div className="blog-image">
          <img src={blog.image} alt={blog.title} loading="lazy" />
        </div>
      )}
      <div className="blog-content">
        <h3 className="blog-title">{blog.title}</h3>
        <div className="blog-metadata">
          <span className="blog-author">By {blog.author}</span>
          <span className="blog-category">{blog.category}</span>
          <span className="blog-date">{formatDate(blog.createdAt)}</span>
        </div>
        <p className="blog-excerpt">
          {blog.content.substring(0, 150)}...
        </p>
        <div className="blog-actions">
          <Link to={`/blog/${blog._id}`} className="read-more-btn">
            Read More
          </Link>
          {isAuthor && (
            <>
              <button onClick={handleEdit} className="edit-btn">
                Edit
              </button>
              <button onClick={handleDelete} className="delete-btn">
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
