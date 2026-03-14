import React from 'react';
import logo from '../assets/logo-new.png'; 
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
              
              {/* WhatsApp (Links to your phone number) */}
              <a href="https://wa.me/601118648860" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                 <img src={whatsappIcon} alt="WhatsApp" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
              </a>
              
              {/* Instagram (NEW CLEAN ICON) */}
              <a href="https://www.instagram.com/stantonacademy_kl?igsh=MTJ0eWdiMnV4azBiZA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg style={{width:'24px', height:'24px'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              
              {/* Facebook (NEW) */}
              <a href="https://www.facebook.com/share/1Cmmp4ahQV/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                 <svg style={{width:'24px'}} fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
              </a>

              {/* Telegram */}
              <a href="https://t.me/stantonacademykl" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
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