import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';
import '../styles/BlogForm.css';

const CATEGORIES = ['Career', 'Finance', 'Travel', 'Technology', 'Lifestyle', 'Other'];

export default function CreateBlog() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Other',
    content: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const titleLength = formData.title.length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.title || !formData.category || !formData.content) {
        setError('Title, category, and content are required');
        setLoading(false);
        return;
      }

      await blogAPI.createBlog(formData);
      navigate('/my-blogs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-blog-page">
      <div className="create-blog-header">
        <div className="header-content">
          <h1>Write a new story</h1>
          <p>Share your thoughts, ideas, and expertise with the world</p>
        </div>
      </div>

      <div className="create-blog-container">
        <div className="create-blog-card">
          {error && <div className="alert alert--error">{error}</div>}

          <form onSubmit={handleSubmit} className="create-form">
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="title" className="form-label-primary">
                  <span>Story Title</span>
                  <span className="char-count">{titleLength}/100</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="A captivating title..."
                  maxLength="100"
                  required
                  className="title-input"
                />
              </div>
            </div>

            <div className="form-section">
              <div className="form-row">
                <div className="form-group form-group-half">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="category-select"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group form-group-half">
                  <label htmlFor="image" className="form-label">Featured Image URL</label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="image-input"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-group">
                <label htmlFor="content" className="form-label">Story Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Begin writing your story... Share your knowledge, experience, and insights."
                  rows="15"
                  required
                  className="content-textarea"
                ></textarea>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/my-blogs')}
                className="btn-secondary"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-publish"
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Publishing...
                  </>
                ) : (
                  'Publish Story'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
