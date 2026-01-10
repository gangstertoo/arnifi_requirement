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
    return <div className="loading">Loading blog...</div>;
  }

  return (
    <div className="blog-form-container">
      <div className="blog-form-card">
        <h1>Edit Blog</h1>
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog content here..."
              rows="10"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL (Optional)</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <button type="submit" disabled={submitting} className="submit-btn">
            {submitting ? 'Updating...' : 'Update Blog'}
          </button>
        </form>
      </div>
    </div>
  );
}
