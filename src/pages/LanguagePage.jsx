import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';

// 1. Import your Courses component for the bottom section
import Courses from '../components/Courses';

// 2. Exact image imports based on your exact file names
import mandarinImg from '../assets/mandarin-class.jpg';
import japaneseImg from '../assets/japanese-class.jpg';
import koreanImg from '../assets/korean-class.jpg';
import bmImg from '../assets/bahasa-malaya.jpg';
import germanImg from '../assets/german-class.jpg';

const languageData = {
  'mandarin': {
    title: 'Mandarin',
    themeColor: '#ef4444', 
    overview: 'Our Mandarin course is designed to take you from absolute beginner to confident speaker. Whether for business or personal growth, immerse yourself in one of the world\'s most spoken languages.',
    frequency: '4x a week',
    duration: '2 hours / session',
    focus: [
      'Master the Pinyin system and the 4 tones of Mandarin.',
      'Learn essential vocabulary for daily conversations.',
      'Introduction to reading and writing Chinese characters.',
      'Explore Chinese culture, etiquette, and traditions.'
    ],
    bestFor: 'Students and professionals looking to tap into the Asian market, or anyone passionate about exploring Chinese culture.',
    outcome: 'Strong foundation in Pinyin, basic character recognition, and the ability to confidently hold everyday conversations.',
    fees: { tuition: 'RM 1250 / mo', registration: 'RM 200', total: 'RM 1450' },
    image: mandarinImg 
  },
  'japanese': {
    title: 'Japanese',
    themeColor: '#22c55e', 
    overview: 'Immerse yourself in the Japanese language and culture. This course builds a solid foundation for JLPT preparation and practical, everyday communication.',
    frequency: '5x a week',
    duration: '4 hours / session',
    focus: [
      'Learn to read and write Hiragana and Katakana fluently.',
      'Introduction to essential everyday Kanji characters.',
      'Practice conversational Japanese for travel and business.',
      'Build a strong foundation for the JLPT N5 examination.'
    ],
    bestFor: 'Anime enthusiasts, future expats, or students aiming to study/work in Japan and pass the JLPT N5.',
    outcome: 'Fluency in basic reading and writing systems, and the ability to navigate standard travel and business conversations.',
    fees: { tuition: 'RM 1875 / mo', registration: 'RM 200', total: 'RM 2075' },
    image: japaneseImg
  },
  'korean': {
    title: 'Korean',
    themeColor: '#3b82f6', 
    overview: 'From pop culture to corporate business, learn to read, write, and speak Korean naturally with proper honorifics and natural intonation.',
    frequency: '5x a week',
    duration: '2 hours / session',
    focus: [
      'Master the Hangul alphabet quickly and easily.',
      'Learn natural pronunciation, intonation, and honorifics.',
      'Understand core grammar structures for everyday phrases.',
      'Engage in practical dialogues for travel and daily life.'
    ],
    bestFor: 'K-culture fans, professionals dealing with Korean companies, and prospective students in South Korea.',
    outcome: 'Complete mastery of reading Hangul, and the confidence to hold natural, polite conversations with native speakers.',
    fees: { tuition: 'RM 1120 / mo', registration: 'RM 200', total: 'RM 1320' },
    image: koreanImg
  },
  'bahasa-malaysia': {
    title: 'Bahasa Malaysia',
    themeColor: '#f97316', 
    overview: 'The perfect course for expats and international students to effortlessly navigate daily life in Malaysia, understand local slang, and speak fluently.',
    frequency: '1x a week',
    duration: '2 hours / session',
    focus: [
      'Learn proper pronunciation and fundamental grammar.',
      'Build a strong, practical vocabulary for everyday use.',
      'Practice useful phrases for shopping, dining, and navigating.',
      'Understand local cultural contexts and conversational slang.'
    ],
    bestFor: 'Expatriates, international students, and foreign workers looking to integrate smoothly into Malaysian society.',
    outcome: 'Ability to confidently converse with locals, order food, shop, and navigate everyday Malaysian life like a pro.',
    fees: { tuition: 'RM 520 / mo', registration: 'RM 200', total: 'RM 720' },
    image: bmImg
  },
  'german': {
    title: 'German',
    themeColor: '#ef4444', 
    overview: 'Master standard Hochdeutsch with a strong focus on core grammar, precise pronunciation, and foundational skills required for Goethe-Institut exams.',
    frequency: '2x a week',
    duration: '2 hours / session',
    focus: [
      'Master standard German (Hochdeutsch) pronunciation.',
      'Learn core grammar rules, including cases and sentence structure.',
      'Build conversational skills for living or studying in Germany.',
      'Preparation foundation for Goethe-Institut examinations.'
    ],
    bestFor: 'Engineers, students applying to German universities, and anyone looking to relocate to DACH region countries.',
    outcome: 'Solid grasp of German cases and syntax, plus the foundational knowledge needed to begin formal exam preparations.',
    fees: { tuition: 'RM 590 / mo', registration: 'RM 200', total: 'RM 790' },
    image: germanImg
  }
};

const LanguagePage = () => {
  const { langId } = useParams();
  const course = languageData[langId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [langId]);

  if (!course) {
    return <Navigate to="/courses" />;
  }

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

        /* Adds a separator before the Courses section */
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

      {/* 4. OTHER COURSES SECTION */}
      <div className="other-courses-divider"></div>
      <Courses />

    </main>
  );
};

export default LanguagePage;