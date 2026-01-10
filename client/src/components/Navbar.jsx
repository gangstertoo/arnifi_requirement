import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Blog App
        </Link>
        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link to="/blogs" className="nav-link">
                All Blogs
              </Link>
              <Link to="/create" className="nav-link">
                Create Blog
              </Link>
              <Link to="/my-blogs" className="nav-link">
                My Blogs
              </Link>
              <span className="user-name">Hi, {user?.name}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
