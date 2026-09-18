import React from 'react';
import { Link } from 'react-router-dom';
import heroDefaultImg from '../assets/student.png';
import { useSiteImages } from '../lib/SiteImagesContext';
import { useLanguage } from '../lib/LanguageContext';

const Hero = () => {
  const images = useSiteImages();
  const { t } = useLanguage();

  return (
    <section className="new-hero">
      <style>{`
        /* Added font-family 'Montserrat' to the main wrapper to cascade to all text elements */
        .new-hero { font-family: 'Montserrat', sans-serif; position: relative; padding: 120px 0 0; overflow: hidden; background-color: var(--bg-light); }
        .new-hero::before { content: ''; position: absolute; top: -15%; right: -10%; width: 55%; height: 70%; background: radial-gradient(circle, rgba(0, 107, 63, 0.08) 0%, transparent 70%); z-index: 0; pointer-events: none; }

        .new-hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }

        .new-hero-text { padding-bottom: 40px; }
        .new-hero-pretitle {
          display: inline-block; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--primary-green); margin-bottom: 16px;
        }
        
        .new-hero-title { font-size: clamp(2.2rem, 4vw, 3.4rem); font-weight: 600; line-height: 1.1; color: #0b0b0b; margin-bottom: 18px; }
        
        .new-hero-subtitle { font-size: 1.15rem; line-height: 1.4; color: var(--light-text); max-width: 480px; margin-bottom: 32px; }
        
        /* Added Montserrat to buttons in case global styles force a different font on <button> or <a> tags */
        .new-hero-btn-group { display: flex; flex-wrap: wrap; gap: 16px; }
        .new-hero-btn-group .btn { display: inline-flex; align-items: center; gap: 8px; font-family: 'Montserrat', sans-serif; }

        .new-hero-image-wrap { display: flex; justify-content: center; align-items: flex-end; }
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
            <span className="new-hero-pretitle">{t('hero.pretitle')}</span>
            <h1 className="new-hero-title">
              {t('hero.titleLine1')}<br />
              {t('hero.titleLine2')}<br />
              {t('hero.titleLine3')}{t('hero.titleHighlight')}
            </h1>
            <p className="new-hero-subtitle">
              {t('hero.subtitle')}
            </p>
            <div className="new-hero-btn-group">
              <Link to="/signup" className="btn btn-primary">{t('hero.applyNow')}</Link>
              <Link to="/courses" className="btn btn-secondary-outline">{t('hero.exploreCourses')}</Link>
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