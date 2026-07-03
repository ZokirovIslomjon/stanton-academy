import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Courses from '../components/Courses';

const IELTSPreparationPage = () => {
  // Forces the page to scroll to the top when it loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Centralized data for easy editing
  const courseData = {
    title: 'IELTS Preparation',
    overview: 'A rigorous, highly focused program designed to equip you with the essential skills, proven strategies, and time-management techniques required to excel in the IELTS examination and achieve your target band.',
    frequency: '5x a week',
    duration: '4 hours / session',
    focus: [
      'Intensive focus on Reading, Writing, Listening, and Speaking.',
      'Learn proven test-taking strategies and time management.',
      'Regular mock tests with personalized, detailed feedback.',
      'Target Band 7.0+ with expert instructor guidance.'
    ],
    bestFor: 'Students planning to study abroad, professionals seeking global career opportunities, or anyone needing to prove their highest level of English proficiency.',
    outcome: 'Comprehensive understanding of the test format, improved pacing, heightened accuracy across all four sections, and readiness to score Band 7.0 or higher.',
    fees: {
      tuition: 'RM 2200 / mo',
      registration: 'RM 200',
      total: 'RM 2400'
    }
  };

  return (
    <main className="ielts-page-wrapper">
      <style>{`
        .ielts-page-wrapper {
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

        .ielts-page-wrapper::before {
          content: ''; position: absolute; top: -10vw; left: -10vw; width: 60vw; height: 60vw;
          background: radial-gradient(circle, rgba(0, 107, 63, 0.08) 0%, transparent 65%);
          z-index: -1; pointer-events: none;
        }
        .ielts-page-wrapper::after {
          content: ''; position: absolute; top: 10vw; right: -15vw; width: 60vw; height: 60vw;
          background: radial-gradient(circle, rgba(255, 199, 44, 0.08) 0%, transparent 65%);
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

        .ge-details {
          text-align: left;
        }
        .ge-details h2 {
          font-size: 1.8rem;
          font-weight: 800;
          color: #111;
          margin-bottom: 20px;
          line-height: 1.3;
        }
        .ge-details p.overview {
          font-size: 1.05rem;
          color: #555;
          line-height: 1.7;
          margin-bottom: 30px;
        }

        .ge-info-bar {
          display: flex;
          gap: 30px;
          background: #ffffff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          margin-bottom: 30px;
          border-left: 4px solid #FFC72C; 
        }
        .ge-info-item {
          display: flex;
          flex-direction: column;
        }
        .ge-info-label {
          font-size: 0.85rem;
          color: #888;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }
        .ge-info-value {
          font-size: 1rem;
          font-weight: 600;
          color: #111;
        }

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
          content: '';
          display: block;
          width: 4px;
          height: 20px;
          background-color: #FFC72C;
          border-radius: 4px;
        }

        .ge-list {
          list-style: none;
          padding: 0;
          margin-bottom: 30px;
        }
        .ge-list li {
          position: relative;
          padding-left: 30px;
          margin-bottom: 12px;
          font-size: 1rem;
          color: #444;
          line-height: 1.5;
        }
        .ge-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          top: -2px;
          color: #006B3F;
          font-size: 1.5rem;
        }

        .ge-text-block {
          margin-bottom: 25px;
          background: #f9f9f9;
          padding: 20px;
          border-radius: 12px;
        }
        .ge-text-block strong {
          color: #111;
          font-size: 1.05rem;
          display: block;
          margin-bottom: 5px;
        }
        .ge-text-block p {
          color: #555;
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .ge-fee-box {
          margin-top: 25px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
        }
        .ge-fee-header {
          background: #006B3F;
          color: white;
          padding: 16px 20px;
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: 0.5px;
        }
        .ge-fee-row {
          display: flex;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid #f3f4f6;
          color: #444;
          font-size: 0.95rem;
        }
        .ge-fee-row:last-child {
          border-bottom: none;
        }
        .ge-fee-total {
          background: #f9fafb;
          font-weight: 700;
          color: #111;
        }

        .ge-cta-container {
          text-align: center;
          margin-top: 80px;
          padding: 0 20px;
        }
        .ge-cta-container p {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111;
          margin-bottom: 25px;
        }
        .ge-cta-btn {
          display: inline-block;
          background-color: transparent;
          color: #111;
          padding: 14px 40px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-decoration: none;
          transition: all 0.3s;
        }
        .ge-cta-btn:hover {
          border-color: #006B3F;
          color: #006B3F;
          background-color: #ffffff;
          box-shadow: 0 10px 20px rgba(0, 107, 63, 0.1);
        }

        @media (max-width: 900px) {
          .ge-content-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .ge-image-wrapper {
            position: static;
          }
          .ge-info-bar {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>

      <div className="ge-header">
        <h1>
          <span style={{ color: '#006B3F' }}>IELTS</span> <span style={{ color: '#FFC72C' }}>PREPARATION</span>
        </h1>
        <p style={{ color: '#006B3F' }}>Master Strategies. Ace the Exam. Achieve Band 7.0+.</p>
      </div>

      <div className="ge-content-container">
        
        <div className="ge-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop" 
            alt="Student taking an exam" 
            className="ge-image"
          />
        </div>

        <div className="ge-details">
          <h2>{courseData.title}</h2>
          <p className="overview">{courseData.overview}</p>

          <div className="ge-info-bar">
            <div className="ge-info-item">
              <span className="ge-info-label">Frequency</span>
              <span className="ge-info-value">{courseData.frequency}</span>
            </div>
            <div className="ge-info-item">
              <span className="ge-info-label">Duration</span>
              <span className="ge-info-value">{courseData.duration}</span>
            </div>
          </div>

          <div className="ge-section-title">Focus Areas</div>
          <ul className="ge-list">
            {courseData.focus.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <div className="ge-text-block">
            <strong>Best For</strong>
            <p>{courseData.bestFor}</p>
          </div>

          <div className="ge-text-block">
            <strong>Outcome</strong>
            <p>{courseData.outcome}</p>
          </div>

          <div className="ge-fee-box">
            <div className="ge-fee-header">Program Fees</div>
            
            <div className="ge-fee-row">
              <span>Tuition Fee</span>
              <span>{courseData.fees.tuition}</span>
            </div>
            
            <div className="ge-fee-row">
              <span>Registration Fee (One-time)</span>
              <span>{courseData.fees.registration}</span>
            </div>
            
            <div className="ge-fee-row ge-fee-total">
              <span>Total Fee</span>
              <span>{courseData.fees.total}</span>
            </div>
          </div>

        </div>
      </div>

      <div className="ge-cta-container">
        <p>Ready to hit your target band? Secure your spot in our next intake.</p>
        <Link to="/signup" className="ge-cta-btn">
          Enquire Now
        </Link>
      </div>

      <div style={{ width: '100%', height: '1px', background: '#e5e7eb', marginBottom: '40px' }}></div>
      <Courses />

    </main>
  );
};

export default IELTSPreparationPage;