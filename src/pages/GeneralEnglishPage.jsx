import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Courses from '../components/Courses';

const courseDetails = {
  '1month': {
    title: 'General English — 1 Month (Intensive Foundation)',
    overview: 'A fast-paced introduction or refresher designed for students who need quick, practical improvement in a short time — ideal for travelers, short-term visa holders, or anyone testing whether English classes are right for them.',
    focus: [
      'Everyday conversation & survival English',
      'Core grammar refresh (tenses, sentence structure)',
      'Basic vocabulary building by theme (travel, work, daily life)',
      'Listening & pronunciation practice'
    ],
    bestFor: 'Beginners needing a quick start, or intermediate students wanting a short refresher before a bigger commitment.',
    outcome: 'Noticeable confidence boost in daily conversations; clear sense of current level and next steps.',
    fees: {
      tuition: 'RM 2400',
      registration: 'RM 200',
      materials: 'RM 50',
      total: 'RM 2600',
      promo: 'RM 410'
    }
  },
  '2months': {
    title: 'General English — 2 Months (Skill Building)',
    overview: 'A balanced program that moves beyond survival English into genuine skill development across all four core competencies — reading, writing, listening, and speaking.',
    focus: [
      'Structured grammar progression (one CEFR sub-level of growth typical)',
      'Expanded vocabulary (academic, professional, and social contexts)',
      'Writing practice: emails, short essays, structured paragraphs',
      'Speaking fluency drills, discussions, and presentations',
      'Regular progress checkpoints (mid-course + final assessment)'
    ],
    bestFor: 'Students preparing for work, further study, or those who completed the 1-month course and want to build real fluency.',
    outcome: 'Measurable level increase (e.g., A2→B1 or B1→B2 depending on starting point), stronger writing and speaking accuracy.',
    fees: {
      tuition: 'RM 4000',
      registration: 'RM 200',
      materials: null,
      total: 'RM 4200',
      promo: 'RM 325'
    }
  },
  '3months': {
    title: 'General English — 3 Months (Comprehensive Program)',
    overview: 'The full-depth program for students committed to a meaningful jump in proficiency — ideal preparation for academic study, career advancement, or exam pathways (IELTS/TOEFL follow-on).',
    focus: [
      'Full grammar mastery across all major structures',
      'Advanced vocabulary + idiomatic expression',
      'Extended writing: essays, reports, formal correspondence',
      'Advanced speaking: debates, presentations, spontaneous discussion',
      'Exam-readiness foundation (optional IELTS/TOEFL bridge module)',
      'Continuous assessment with a final proficiency evaluation & certificate'
    ],
    bestFor: 'Students aiming for a full CEFR level jump, university preparation, or long-term skill investment.',
    outcome: 'Strong, well-rounded fluency; certificate of completion; readiness for exam-prep courses if needed.',
    fees: {
      tuition: 'RM 7000',
      registration: 'RM 200',
      materials: null,
      total: 'RM 7200',
      promo: 'RM 366'
    }
  }
};

const GeneralEnglishPage = () => {
  const [activeTab, setActiveTab] = useState('1month');
  const activeData = courseDetails[activeTab];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="ge-page-wrapper">
      <style>{`
        .ge-page-wrapper {
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

        .ge-page-wrapper::before {
          content: ''; position: absolute; top: -10vw; left: -10vw; width: 60vw; height: 60vw;
          background: radial-gradient(circle, rgba(0, 107, 63, 0.08) 0%, transparent 65%);
          z-index: -1; pointer-events: none;
        }
        .ge-page-wrapper::after {
          content: ''; position: absolute; top: 10vw; right: -15vw; width: 60vw; height: 60vw;
          background: radial-gradient(circle, rgba(255, 199, 44, 0.08) 0%, transparent 65%);
          z-index: -1; pointer-events: none;
        }

        .ge-header {
          text-align: center;
          margin-bottom: 40px;
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

        .ge-tabs-container {
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 60px;
          padding: 0 20px;
        }
        .ge-tab-btn {
          background: transparent;
          border: 2px solid #006B3F;
          color: #006B3F;
          padding: 12px 30px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .ge-tab-btn:hover {
          background: rgba(0, 107, 63, 0.1);
        }
        .ge-tab-btn.active {
          background: #006B3F;
          color: #ffffff;
          box-shadow: 0 10px 20px rgba(0, 107, 63, 0.2);
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
        .ge-fee-promo {
          background: #e6f4ea;
          font-weight: 800;
          color: #006B3F;
          font-size: 1.1rem;
        }

        .ge-cta-container {
          text-align: center;
          margin-top: 80px;
          margin-bottom: 80px;
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

        .other-courses-divider {
          width: 100%;
          height: 1px;
          background: #e5e7eb;
          margin-bottom: 40px;
        }

        @media (max-width: 900px) {
          .ge-content-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .ge-image-wrapper {
            position: static;
          }
        }
      `}</style>

      <div className="ge-header">
        <h1>
          <span style={{ color: '#006B3F' }}>GENERAL</span> <span style={{ color: '#FFC72C' }}>ENGLISH</span>
        </h1>
        <p style={{ color: '#006B3F' }}>Beyond English. Build Confidence. Speak Naturally.</p>
      </div>

      <div className="ge-tabs-container">
        <button 
          className={`ge-tab-btn ${activeTab === '1month' ? 'active' : ''}`}
          onClick={() => setActiveTab('1month')}
        >
          1 Month
        </button>
        <button 
          className={`ge-tab-btn ${activeTab === '2months' ? 'active' : ''}`}
          onClick={() => setActiveTab('2months')}
        >
          2 Months
        </button>
        <button 
          className={`ge-tab-btn ${activeTab === '3months' ? 'active' : ''}`}
          onClick={() => setActiveTab('3months')}
        >
          3 Months
        </button>
      </div>

      <div className="ge-content-container" key={activeTab}>
        
        <div className="ge-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" 
            alt="Students collaborating" 
            className="ge-image"
          />
        </div>

        <div className="ge-details">
          <h2>{activeData.title}</h2>
          <p className="overview">{activeData.overview}</p>

          <div className="ge-section-title">Focus Areas</div>
          <ul className="ge-list">
            {activeData.focus.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <div className="ge-text-block">
            <strong>Best For</strong>
            <p>{activeData.bestFor}</p>
          </div>

          <div className="ge-text-block">
            <strong>Outcome</strong>
            <p>{activeData.outcome}</p>
          </div>

          <div className="ge-fee-box">
            <div className="ge-fee-header">Program Fees</div>
            
            <div className="ge-fee-row">
              <span>Tuition Fee</span>
              <span>{activeData.fees.tuition}</span>
            </div>
            
            <div className="ge-fee-row">
              <span>Registration Fee</span>
              <span>{activeData.fees.registration}</span>
            </div>
            
            {activeData.fees.materials && (
              <div className="ge-fee-row">
                <span>Materials Fee</span>
                <span>{activeData.fees.materials}</span>
              </div>
            )}
            
            <div className="ge-fee-row ge-fee-total">
              <span>Total Fee</span>
              <span>{activeData.fees.total}</span>
            </div>
            
            <div className="ge-fee-row ge-fee-promo">
              <span>Promo Price</span>
              <span>{activeData.fees.promo}</span>
            </div>
          </div>

        </div>
      </div>

      <div className="ge-cta-container">
        <p>Learn English the way it's meant to be used — naturally, confidently, and effectively.</p>
        <Link to="/signup" className="ge-cta-btn">
          Enquire Now
        </Link>
      </div>

      <div className="other-courses-divider"></div>
      <Courses />

    </main>
  );
};

export default GeneralEnglishPage;