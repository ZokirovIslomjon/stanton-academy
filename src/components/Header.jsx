import React from 'react';
import logo from '../assets/logo.png'; 

// We accept 'onOpenModal' as a prop to open the popup when clicking Apply
const Header = ({ onOpenModal }) => {
  
  // This function handles the smooth scrolling to sections
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
                {/* Points to the #location ID we added in App.jsx */}
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

          {/* Apply Button - triggers the Registration Modal */}
          <div className="auth-buttons">
            <button className="btn btn-primary" onClick={onOpenModal}>
              Apply
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;