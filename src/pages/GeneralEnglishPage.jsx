import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// 1. Import your Courses component for the bottom section
import Courses from '../components/Courses';

// This page is served directly at /general-english (see App.jsx).
// Unlike LanguagePage, it has no :langId route param, so the content
// below is hardcoded rather than looked up from a shared data object.

const course = {
  title: 'General English',
  themeColor: '#3b82f6',
  overview: 'Our General English course builds well-rounded fluency across Reading, Writing, Listening, and Speaking, helping you communicate confidently in everyday, academic, and professional settings.',
  frequency: '5x a week',
  duration: '4.5 hours / session',
  focus: [
    'Master everyday English vocabulary and grammar structures.',
    'Intensive focus on Reading, Writing, Listening, and Speaking.',
    'Engage in real-life conversational practice.',
    'Build confidence for travel, work, and socializing.'
  ],
  bestFor: 'Students, working professionals, and anyone looking to build strong, well-rounded English skills for daily life and career growth.',
  outcome: 'Confident, fluent communication across all four core English skills, ready for real-world academic, social, and workplace situations.',
  fees: { tuition: 'RM 2400 / mo', registration: 'RM 200', total: 'RM 2600' },
  image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop'
};

const GeneralEnglishPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="lang-page-wrapper">
      <style>{`
        .lang-page-wrapper {
          overflow-x: hidden;
          background-color: #fdfdfc; 
          padding-top: 120px; 
          padding-bottom: 80px;
          min-height: 100vh;
          font-family: 'Poppins', sans-serif;
          color: #1a1a1a;
          position: relative;
          z-index: 1;
        }

        .lang-page-wrapper::before {
          content: ''; position: absolute; top: -10vw; left: -10vw; width: 60vw; height: 60vw;
          background: radial-gradient(circle, ${course.themeColor}15 0%, transparent 65%);
          z-index: -1; pointer-events: none;
        }

        .ge-header {
          text-align: center;
          margin-bottom: 60px;
          padding: 0 20px;
        }
        .ge-header h1 {
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 15px;
        }
        .ge-header p {
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 600;
          margin-bottom: 0;
          color: #006B3F;
        }

        .ge-content-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: flex-start;
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ge-image-wrapper {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          position: sticky;
          top: 100px;
        }
        .ge-image {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          aspect-ratio: 4/3;
        }

        .ge-details { text-align: left; }
        .ge-details h2 { font-size: 1.8rem; font-weight: 800; color: #111; margin-bottom: 20px; line-height: 1.3; }
        .ge-details p.overview { font-size: 1.05rem; color: #555; line-height: 1.7; margin-bottom: 30px; }

        .ge-info-bar {
          display: flex;
          gap: 30px;
          background: #ffffff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          margin-bottom: 30px;
          border-left: 4px solid ${course.themeColor}; 
        }
        .ge-info-item { display: flex; flex-direction: column; }
        .ge-info-label { font-size: 0.85rem; color: #888; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; margin-bottom: 4px; }
        .ge-info-value { font-size: 1rem; font-weight: 600; color: #111; }

        .ge-section-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #111;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ge-section-title::before {
          content: ''; display: block; width: 4px; height: 20px; background-color: ${course.themeColor}; border-radius: 4px;
        }

        .ge-list { list-style: none; padding: 0; margin-bottom: 30px; }
        .ge-list li { position: relative; padding-left: 30px; margin-bottom: 12px; font-size: 1rem; color: #444; line-height: 1.5; }
        .ge-list li::before {
          content: '•'; position: absolute; left: 0; top: -2px; color: ${course.themeColor}; font-size: 1.5rem;
        }

        .ge-text-block { margin-bottom: 25px; background: #f9f9f9; padding: 20px; border-radius: 12px; }
        .ge-text-block strong { color: #111; font-size: 1.05rem; display: block; margin-bottom: 5px; }
        .ge-text-block p { color: #555; margin: 0; font-size: 0.95rem; line-height: 1.6; }

        .ge-fee-box { margin-top: 25px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.02); }
        .ge-fee-header { background: #006B3F; color: white; padding: 16px 20px; font-weight: 700; font-size: 1.05rem; letter-spacing: 0.5px; }
        .ge-fee-row { display: flex; justify-content: space-between; padding: 14px 20px; border-bottom: 1px solid #f3f4f6; color: #444; font-size: 0.95rem; }
        .ge-fee-row:last-child { border-bottom: none; }
        .ge-fee-total { background: #f9fafb; font-weight: 700; color: #111; }

        .ge-cta-container { text-align: center; margin-top: 80px; margin-bottom: 80px; padding: 0 20px; }
        .ge-cta-container p { font-size: 1.1rem; font-weight: 600; color: #111; margin-bottom: 25px; }
        .ge-cta-btn {
          display: inline-block; background-color: transparent; color: #111; padding: 14px 40px; border: 2px solid #e5e7eb;
          border-radius: 8px; font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; transition: all 0.3s;
        }
        .ge-cta-btn:hover {
          border-color: #006B3F; color: #006B3F; background-color: #ffffff; box-shadow: 0 10px 20px rgba(0, 107, 63, 0.1);
        }

        .other-courses-divider {
          width: 100%;
          height: 1px;
          background: #e5e7eb;
          margin-bottom: 40px;
        }

        @media (max-width: 900px) {
          .ge-content-container { grid-template-columns: 1fr; gap: 40px; }
          .ge-image-wrapper { position: static; }
          .ge-info-bar { flex-direction: column; gap: 15px; }
        }
      `}</style>

      <div className="ge-header">
        <h1>
          <span style={{ color: '#006B3F' }}>LEARN</span> <span style={{ color: course.themeColor }}>{course.title}</span>
        </h1>
        <p>Beyond Words. Build Confidence. Speak Naturally.</p>
      </div>

      <div className="ge-content-container">
        <div className="ge-image-wrapper">
          <img src={course.image} alt={`${course.title} classes`} className="ge-image" />
        </div>

        <div className="ge-details">
          <h2>{course.title} Intensive Course</h2>
          <p className="overview">{course.overview}</p>

          <div className="ge-info-bar">
            <div className="ge-info-item">
              <span className="ge-info-label">Frequency</span>
              <span className="ge-info-value">{course.frequency}</span>
            </div>
            <div className="ge-info-item">
              <span className="ge-info-label">Duration</span>
              <span className="ge-info-value">{course.duration}</span>
            </div>
          </div>

          <div className="ge-section-title">Focus Areas</div>
          <ul className="ge-list">
            {course.focus.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <div className="ge-text-block">
            <strong>Best For</strong>
            <p>{course.bestFor}</p>
          </div>

          <div className="ge-text-block">
            <strong>Outcome</strong>
            <p>{course.outcome}</p>
          </div>

          <div className="ge-fee-box">
            <div className="ge-fee-header">Program Fees</div>
            <div className="ge-fee-row">
              <span>Tuition Fee</span>
              <span>{course.fees.tuition}</span>
            </div>
            <div className="ge-fee-row">
              <span>Registration Fee (One-time)</span>
              <span>{course.fees.registration}</span>
            </div>
            <div className="ge-fee-row ge-fee-total">
              <span>Total Fee</span>
              <span>{course.fees.total}</span>
            </div>
          </div>

        </div>
      </div>

      <div className="ge-cta-container">
        <p>Start your language journey with us today.</p>
        <Link to="/signup" className="ge-cta-btn">Enquire Now</Link>
      </div>

      <div className="other-courses-divider"></div>
      <Courses />

    </main>
  );
};

export default GeneralEnglishPage;