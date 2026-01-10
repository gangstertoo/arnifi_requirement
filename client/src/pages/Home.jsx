import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/blogs');
    return null;
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Blog App</h1>
          <p>Share your thoughts, stories, and ideas with the world</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/signup" className="btn btn-secondary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <span>Create</span>
            </div>
            <h3>Create Blogs</h3>
            <p>Write and publish your own blogs with ease</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span>Read</span>
            </div>
            <h3>Read Content</h3>
            <p>Discover and read blogs from other users</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span>Filter</span>
            </div>
            <h3>Filter & Search</h3>
            <p>Find blogs by category or author</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span>Manage</span>
            </div>
            <h3>Manage Content</h3>
            <p>Edit and delete your own blogs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
