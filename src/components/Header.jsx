import React from 'react';
import { Link } from 'react-router-dom'; // 👈 Add this import
import logo from '../assets/logo.png'; 

const Header = () => {
  
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header>
      <div className="container">
        <nav>
          {/* Logo Section */}
          <div className="logo">
            <img src={logo} alt="Stanton Academy" />
          </div>
          
          {/* Navigation Links */}
          <ul className="nav-links">
            <li>
                <a href="#courses" onClick={(e) => handleScroll(e, 'courses')}>
                    Courses
                </a>
            </li>
            <li>
                <a href="#location" onClick={(e) => handleScroll(e, 'location')}>
                    Branch
                </a>
            </li>
            <li>
                <a href="#about" onClick={(e) => handleScroll(e, 'about')}>
                    About Us
                </a>
            </li>
            <li>
                <a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>
                    Contact
                </a>
            </li>
          </ul>

          {/* Apply Button - now navigates to /signup page */}
          <div className="auth-buttons">
            <Link to="/signup" className="btn btn-primary">
              Apply
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
