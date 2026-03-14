import React from 'react';
import { Link } from 'react-router-dom';

const Courses = ({ onOpenModal }) => {
  // Added price, frequency, and duration to the data
  const courseData = [
    {
      id: 1, theme: 'blue', title: 'General English',
      price: '2200 RM/mo', frequency: '5x a week', duration: '4.5 hours',
      features: [ 
        'Master everyday English vocabulary and grammar structures.', 
        'Intensive focus on Reading, Writing, Listening, and Speaking.', 
        'Engage in real-life conversational practice.', 
        'Build confidence for travel, work, and socializing.' 
      ]
    },
    {
      id: 2, theme: 'orange', title: 'IELTS Preparation',
      price: '2200 RM/mo', frequency: '5x a week', duration: '4 hours',
      features: [ 
        'Intensive focus on Reading, Writing, Listening, and Speaking.', 
        'Learn proven test-taking strategies and time management.', 
        'Regular mock tests with personalized, detailed feedback.', 
        'Target Band 7.0+ with expert instructor guidance.' 
      ]
    },
    {
      id: 3, theme: 'red', title: 'Mandarin',
      price: '1250 RM/mo', frequency: '4x a week', duration: '2 hours',
      features: [ 
        'Master the Pinyin system and the 4 tones of Mandarin.', 
        'Learn essential vocabulary for daily conversations.', 
        'Introduction to reading and writing Chinese characters.', 
        'Explore Chinese culture, etiquette, and traditions.' 
      ]
    },
    {
      id: 4, theme: 'green', title: 'Japanese',
      price: '1875 RM/mo', frequency: '5x a week', duration: '4 hours',
      features: [ 
        'Learn to read and write Hiragana and Katakana fluently.', 
        'Introduction to essential everyday Kanji characters.', 
        'Practice conversational Japanese for travel and business.', 
        'Build a strong foundation for the JLPT N5 examination.' 
      ]
    },
    {
      id: 5, theme: 'blue', title: 'Korean',
      price: '1120 RM/mo', frequency: '5x a week', duration: '2 hours',
      features: [ 
        'Master the Hangul alphabet quickly and easily.', 
        'Learn natural pronunciation, intonation, and honorifics.', 
        'Understand core grammar structures for everyday phrases.', 
        'Engage in practical dialogues for travel and daily life.' 
      ]
    },
    {
      id: 6, theme: 'orange', title: 'Bahasa Malaysia',
      price: '520 RM/mo', frequency: '1x a week', duration: '2 hours',
      features: [ 
        'Learn proper pronunciation and fundamental grammar.', 
        'Build a strong, practical vocabulary for everyday use.', 
        'Practice useful phrases for shopping, dining, and navigating.', 
        'Understand local cultural contexts and conversational slang.' 
      ]
    },
    {
      id: 7, theme: 'red', title: 'German',
      price: '590 RM/mo', frequency: '2x a week', duration: '2 hours',
      features: [ 
        'Master standard German (Hochdeutsch) pronunciation.', 
        'Learn core grammar rules, including cases and sentence structure.', 
        'Build conversational skills for living or studying in Germany.', 
        'Preparation foundation for Goethe-Institut examinations.' 
      ]
    }
  ];

  return (
    <section className="courses-section" id="courses">
      <div className="container">
        <div className="section-header">
          <h2>Our <span>Courses</span></h2>
          <p>Discover the courses available and choose the one that suits you best</p>
        </div>

        <div className="pricing-grid">
          {courseData.map((course) => (
            <div key={course.id} className={`pricing-card ${course.theme}-theme`}>
              
              <div className="card-header">
                <div className="icon-circle">
                   {course.theme === 'blue' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>}
                   {course.theme === 'orange' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>}
                   {course.theme === 'green' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
                   {course.theme === 'red' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>}
                </div>
                <h3>{course.title}</h3>
              </div>
              
              {/* MOVED OUTSIDE OF HEADER AND STYLED */}
              <div className="course-info-block" style={{ textAlign: 'center', padding: '0 20px 20px 20px', borderBottom: '1px solid #f3f4f6', marginBottom: '20px' }}>
                
                {/* Reduced font size to 1.25rem */}
                <div className="course-price" style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1f2937', marginBottom: '12px' }}>
                  {course.price}
                </div>

                <div className="course-meta" style={{ display: 'flex', gap: '15px', justifyContent: 'center', fontSize: '0.85rem', color: '#6b7280' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {course.frequency}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {course.duration}
                  </span>
                </div>
              </div>
              
              <ul className="feature-list" style={{ marginTop: '0' }}>
                {course.features.map((feature, index) => (
                  <li key={index}>
                    <span className="check-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="card-footer">
                <Link to="/signup" className="btn-full-width">
                    Sign up 
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;