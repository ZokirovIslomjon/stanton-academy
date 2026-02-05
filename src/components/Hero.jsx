import React from 'react';
import bookIcon from '../assets/book.png';
import notebookIcon from '../assets/notebook.png';
import penIcon from '../assets/pen.png';

// We accept 'onOpenModal' to open the popup when clicking the button
const Hero = ({ onOpenModal }) => {
  return (
    <section className="hero new-hero-style">
      
      {/* Floating Icons */}
      <div className="floating-icon icon-book">
        <img src={bookIcon} alt="Book" />
      </div>
      <div className="floating-icon icon-notebook">
        <img src={notebookIcon} alt="Notebook" />
      </div>
      <div className="floating-icon icon-pen">
        <img src={penIcon} alt="Pen" />
      </div>

      <div className="container">
        <div className="hero-text-centered">
          <h1>We don't just teach English, <span>we change people's lives!</span></h1>
          <p>Master the English language with Stanton Academy's world-class curriculum.</p>

          <div className="cta-buttons centered-btns">
              {/* Connected the Modal Here 👇 */}
              <button className="btn btn-primary" onClick={onOpenModal}>
                Sign up for the first lesson ✨
              </button>
              
          </div>
        </div>

        <div className="hero-stats-container">
            <div className="stat-card yellow-card">
                <div className="dot blue-dot"></div>
                <h2>10+</h2>
                <p>Years of experience</p>
            </div>

            <div className="stat-card red-card">
                <div className="dot red-dot"></div>
                <h2>1,000+</h2>
                <p>Students who have learned English</p>
            </div>

            <div className="stat-card green-card">
                <div className="dot green-dot"></div>
                <h2>50+</h2>
                <p>Experienced Teachers</p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;