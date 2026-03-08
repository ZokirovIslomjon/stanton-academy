import React from 'react';
import { Link } from 'react-router-dom'; // 👈 Add this
import bookIcon from '../assets/book.png';
import notebookIcon from '../assets/notebook.png';
import penIcon from '../assets/pen.png';

const Hero = ({ onOpenModal }) => {
  return (
    <section className="hero new-hero-style">
      {/* ... icons ... */}
      <div className="container">
        <div className="hero-text-centered">
          <h1>We don't just teach English, <span>we change people's lives!</span></h1>
          <p>Master the English language with Stanton Academy's world-class curriculum.</p>
          <div className="cta-buttons centered-btns">
            {/* Replace button with Link */}
            <Link to="/signup" className="btn btn-primary">
              Sign up for the first lesson ✨
            </Link>
          </div>
        </div>
        {/* ... stats ... */}
      </div>
    </section>
  );
};

export default Hero;