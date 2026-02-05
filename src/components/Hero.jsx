import React from 'react';
import bookIcon from '../assets/book.png';
import notebookIcon from '../assets/notebook.png';
import penIcon from '../assets/pen.png';

const Hero = ({ onOpenModal }) => {
  return (
    <section className="hero new-hero-style">
      
      {/* Floating Icons with blur */}
      <div className="floating-icon icon-book">
        <img src={bookIcon} alt="Book" style={{ opacity: 0.7, filter: 'blur(3px)' }} />
      </div>
      <div className="floating-icon icon-notebook">
        <img src={notebookIcon} alt="Notebook" style={{ opacity: 0.7, filter: 'blur(3px)' }} />
      </div>
      <div className="floating-icon icon-pen">
        <img src={penIcon} alt="Pen" style={{ opacity: 0.7, filter: 'blur(3px)' }} />
      </div>

      <div className="container">
        <div className="hero-text-centered">
          <h1>We don't just teach English, <span>we change people's lives!</span></h1>
          <p>Master the English language with Stanton Academy's world-class curriculum.</p>

          <div className="cta-buttons centered-btns">
              <button className="btn btn-primary" onClick={onOpenModal}>
                Sign up for the first lesson ✨
              </button>
          </div>
        </div>

        {/* 2-column stats container */}
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