import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogAPI } from '../services/api';
import '../styles/BlogForm.css';

const CATEGORIES = ['Career', 'Finance', 'Travel', 'Technology', 'Lifestyle', 'Other'];

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Other',
    content: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getBlogById(id);
      setFormData({
        title: response.data.blog.title,
        category: response.data.blog.category,
        content: response.data.blog.content,
        image: response.data.blog.image || ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch blog');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (!formData.title || !formData.category || !formData.content) {
        setError('Title, category, and content are required');
        setSubmitting(false);
        return;
      }

      await blogAPI.updateBlog(id, formData);
      navigate('/my-blogs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update blog');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="create-blog-page">
        <div className="loading-full">
          <div className="spinner-large"></div>
          <p>Loading your story...</p>
        </div>
      </div>
    );
  }

  const titleLength = formData.title.length;

  return (
    <div className="create-blog-page">
      <div className="create-blog-header">
        <div className="header-content">
          <h1>Edit your story</h1>
          <p>Refine your thoughts and ideas</p>
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
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn-publish"
              >
                {submitting ? (
                  <>
                    <span className="spinner"></span>
                    Updating...
                  </>
                ) : (
                  'Update Story'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
