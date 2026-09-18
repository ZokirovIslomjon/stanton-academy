import React from 'react';
import { Link } from 'react-router-dom';
import heroDefaultImg from '../assets/student.png';
import { useSiteImages } from '../lib/SiteImagesContext';

const Hero = () => {
  const images = useSiteImages();

  return (
    <section className="new-hero">
      <style>{`
        .new-hero { position: relative; padding: 120px 0 50px; overflow: hidden; background-color: var(--bg-light); }
        .new-hero::before { content: ''; position: absolute; top: -15%; right: -10%; width: 55%; height: 70%; background: radial-gradient(circle, rgba(0, 107, 63, 0.08) 0%, transparent 70%); z-index: 0; pointer-events: none; }

        .new-hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 0.85fr 1.3fr; gap: 40px; align-items: center; }

        .new-hero-text { padding-bottom: 40px; }
        .new-hero-pretitle {
          display: inline-block; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--primary-green); margin-bottom: 16px;
        }
        .new-hero-title { font-size: clamp(2.2rem, 4vw, 3.4rem); font-weight: 600; line-height: 1.1; color: var(--dark-text); margin-bottom: 18px; }
        .new-hero-title span { color: var(--primary-gold); }
        .new-hero-subtitle { font-size: 1.15rem; line-height: 1.4; color: var(--light-text); max-width: 480px; margin-bottom: 32px; }
        .new-hero-btn-group { display: flex; flex-wrap: wrap; gap: 16px; }
        .new-hero-btn-group .btn { display: inline-flex; align-items: center; gap: 8px; }

        .new-hero-image-wrap { display: flex; justify-content: center; }
        .new-hero-image-wrap img { display: block; width: auto; max-width: 100%; height: auto; max-height: 540px; }

        @media (max-width: 900px) {
          .new-hero { padding: 130px 0 0; }
          .new-hero-grid { grid-template-columns: 1fr; gap: 0; }
          .new-hero-text { padding-bottom: 30px; }
          .new-hero-image-wrap { order: -1; }
          .new-hero-image-wrap img { max-width: 380px; }
          .new-hero-subtitle { max-width: none; }
        }
      `}</style>

      <div className="container">
        <div className="new-hero-grid">
          <div className="new-hero-text">
            <span className="new-hero-pretitle">Language Education For A Global Future</span>
            <h1 className="new-hero-title">
              Stanton Academy - High-Quality Language Courses for <span>Global Learners</span>
            </h1>
            <p className="new-hero-subtitle">
              Build your language skills with practical courses designed for real-world communication.
            </p>
            <div className="new-hero-btn-group">
              <Link to="/signup" className="btn btn-primary">Apply Now ↗</Link>
              <Link to="/courses" className="btn btn-secondary-outline">Explore Courses</Link>
            </div>
          </div>

          <div className="new-hero-image-wrap">
            <img src={images.hero_banner || heroDefaultImg} alt="Stanton Academy student" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
