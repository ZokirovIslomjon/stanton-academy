import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png'; 
import logoWhite from '../assets/logo-new.png'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const isDarkBackground = location.pathname === '/signup';
  // List of pages that should have a transparent header at the very top
  const isTransparentPage = ['/', '/about', '/contact'].includes(location.pathname);

  // Listen for scrolling to change header from transparent to solid
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Determine the dynamic background color
  let headerBg = '#ffffff';
  if (isDarkBackground) {
    headerBg = '#022c19'; // Solid dark green for signup page
  } else if (isTransparentPage && !isScrolled) {
    headerBg = 'transparent'; // Completely see-through at the top of these pages!
  }

  return (
    <header 
      className={isDarkBackground ? 'theme-dark' : 'theme-light'}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: headerBg,
        boxShadow: isScrolled && !isDarkBackground ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        padding: '10px 0' // Adds a little breathing room
      }}
    >
      <style>{`
        .right-side-nav { display: flex; align-items: center; gap: 15px; }
        .nav-links { display: flex; list-style: none; gap: 30px; margin: 0; padding: 0; }
        .nav-links li a { text-decoration: none; font-weight: 600; font-size: 0.95rem; transition: color 0.3s ease; }
        
        .theme-light .nav-links li a { color: #1f2937; }
        .theme-light .nav-links li a:hover { color: #006B3F; }
        .theme-dark .nav-links li a { color: #ffffff; }
        .theme-dark .nav-links li a:hover { color: #FFC72C; }

        .theme-dark .btn-apply { background-color: #FFC72C !important; color: #006B3F !important; font-weight: 800 !important; }

        .hamburger-btn { display: none; background: transparent; border: none; cursor: pointer; padding: 5px; z-index: 1001; }
        .hamburger-btn span { display: block; width: 25px; height: 3px; margin: 5px 0; border-radius: 3px; transition: all 0.3s ease; }
        
        .theme-light .hamburger-btn span { background-color: #006B3F; }
        .theme-dark .hamburger-btn span { background-color: #ffffff; }

        .hamburger-btn.open span:nth-child(1) { transform: rotate(-45deg) translate(-5px, 6px); }
        .hamburger-btn.open span:nth-child(2) { opacity: 0; }
        .hamburger-btn.open span:nth-child(3) { transform: rotate(45deg) translate(-5px, -6px); }

        @media (max-width: 900px) {
          .hamburger-btn { display: block; }
          .nav-links {
            position: fixed; top: 0; right: -100%; height: 100vh; width: 250px;
            background-color: #ffffff; display: flex; flex-direction: column;
            justify-content: flex-start; align-items: center; padding-top: 100px;
            box-shadow: -5px 0 15px rgba(0,0,0,0.1); transition: right 0.3s ease-in-out; z-index: 1000;
          }
          .nav-links.open { right: 0; }
          .nav-links li { width: 85%; margin: 8px 0; }
          .theme-dark .nav-links li a, .theme-light .nav-links li a {
            display: block; width: 100%; background-color: #f4f5f7; color: #1e1e2f; 
            text-align: center; padding: 14px 20px; border-radius: 12px;
          }
          .theme-dark .nav-links li a:hover, .theme-light .nav-links li a:hover { background-color: #e5e7eb; color: #1e1e2f; }
          .hamburger-btn.open span { background-color: #006B3F !important; }
        }
      `}</style>

      <div className="container">
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div className="logo" style={{ zIndex: 1001 }}>
            <Link to="/" onClick={closeMenu}>
              <img src={isDarkBackground ? logoWhite : logo} alt="Stanton Academy" style={{ height: '45px' }} />
            </Link>
          </div>
          
          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <li><Link to="/courses" onClick={closeMenu}>Courses</Link></li>
            <li><Link to="/location" onClick={closeMenu}>Branch</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
            <li><Link to="/holiday-camp" onClick={closeMenu}>Holiday Camp</Link></li>
          </ul>

          <div className="right-side-nav">
            <div className="auth-buttons">
              <Link to="/signup" className="btn btn-primary btn-apply" onClick={closeMenu}>
                Apply
              </Link>
            </div>
            <button className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span></span><span></span><span></span>
            </button>
          </div>

        </nav>
      </div>
    </header>
  );
};

export default Header;