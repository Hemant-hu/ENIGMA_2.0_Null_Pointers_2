// Header.jsx
import React, { useState } from 'react';
import './Header.css';
import { Menu, X, Upload, LayoutDashboard } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="solution-header">
      <div className="header-container">
        <nav className="nav-bar">
          {/* Logo */}
          <div className="logo">
            <span className="logo-text">🌓 LunaSlide<span>AI</span></span>
          </div>

          {/* Desktop Navigation - Only Upload & Dashboard */}
          <div className="nav-links">
            <a href="#upload" className="nav-item">
              <Upload size={18} />
              <span>Upload</span>
            </a>
            <a href="#dashboard" className="nav-item">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <a href="#upload" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>
              <Upload size={20} />
              <span>Upload</span>
            </a>
            <a href="#dashboard" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </a>
          </div>
        )}
      </div>

      {/* Simple Status Bar */}
      {/* <div className="status-bar">
        <div className="status-content">
          <span className="status-dot"></span>
          <span>Ready to upload Moon imagery</span>
        </div>
      </div> */}
    </header>
  );
};

export default Header;