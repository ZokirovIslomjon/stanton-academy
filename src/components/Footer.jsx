import React from 'react';
import logo from '../assets/logo-white.png'; 
import whatsappIcon from '../assets/whatsapp.png';

const Footer = () => {
  return (
    <footer className="footer-section" id="contact">
      <div className="container">
        
        <div className="footer-top">
          
          <div className="footer-col logo-col">
            <div className="footer-logo">
               <img src={logo} alt="Stanton Academy" />
            </div>
          </div>

          <div className="footer-col links-col">
            <h4>Stanton Academy</h4>
            <ul>
              <li><a href="#courses">Courses</a></li>
              <li><a href="#location">Branches</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col contact-col">
            <h4>Our contacts</h4>
            <p className="phone-number">
              <svg style={{width:'16px', marginRight:'8px'}} fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              +60 1118648860
            </p>
            <p className="email-address">info@stanton-academy.com</p>
          </div>

          <div className="footer-col social-col">
            <h4>Our social media</h4>
            <div className="social-icons">
              <a href="#" aria-label="WhatsApp">
                 <img src={whatsappIcon} alt="WhatsApp" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
              </a>
              <a href="#" aria-label="Instagram">
                <svg style={{width:'24px'}} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" aria-label="Telegram">
                 <svg style={{width:'24px'}} fill="currentColor" viewBox="0 0 24 24"><path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p>Copyright © 2026 Stanton Academy. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;