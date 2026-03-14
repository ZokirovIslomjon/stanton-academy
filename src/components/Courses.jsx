import React from 'react';
import { Link } from 'react-router-dom';

const Courses = ({ onOpenModal }) => {
  const courseData = [
    {
      id: 1, 
      theme: 'blue', 
      title: 'General English',
      features: [ 
        'Master everyday English vocabulary and grammar structures.', 
        'Improve listening and speaking fluency for daily use.', 
        'Engage in real-life conversational practice.', 
        'Build confidence for travel, work, and socializing.' 
      ]
    },
    {
      id: 2, 
      theme: 'orange', 
      title: 'IELTS Preparation',
      features: [ 
        'Intensive focus on Reading, Writing, Listening, and Speaking.', 
        'Learn proven test-taking strategies and time management.', 
        'Regular mock tests with personalized, detailed feedback.', 
        'Target Band 7.0+ with expert instructor guidance.' 
      ]
    },
    {
      id: 3, 
      theme: 'red', 
      title: 'Mandarin',
      features: [ 
        'Master the Pinyin system and the 4 tones of Mandarin.', 
        'Learn essential vocabulary for daily conversations.', 
        'Introduction to reading and writing Chinese characters (Hanzi).', 
        'Explore Chinese culture, etiquette, and traditions.' 
      ]
    },
    {
      id: 4, 
      theme: 'green', 
      title: 'Japanese',
      features: [ 
        'Learn to read and write Hiragana and Katakana fluently.', 
        'Introduction to essential everyday Kanji characters.', 
        'Practice conversational Japanese for travel and business.', 
        'Build a strong foundation for the JLPT N5 examination.' 
      ]
    },
    {
      id: 5, 
      theme: 'blue', 
      title: 'Korean',
      features: [ 
        'Master the Hangul alphabet quickly and easily.', 
        'Learn natural pronunciation, intonation, and honorifics.', 
        'Understand core grammar structures for everyday phrases.', 
        'Engage in practical dialogues for travel and daily life.' 
      ]
    },
    {
      id: 6, 
      theme: 'orange', 
      title: 'Bahasa Malaysia',
      features: [ 
        'Learn proper pronunciation and fundamental grammar.', 
        'Build a strong, practical vocabulary for everyday use.', 
        'Practice useful phrases for shopping, dining, and navigating.', 
        'Understand local cultural contexts and conversational slang.' 
      ]
    },
    {
      id: 7, 
      theme: 'red', 
      title: 'German',
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
                   {/* Blue Icon (Graduation Cap) */}
                   {course.theme === 'blue' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>}
                   
                   {/* Orange Icon (Clipboard/Test) */}
                   {course.theme === 'orange' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>}
                   
                   {/* Green Icon (Star/Badge) */}
                   {course.theme === 'green' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}

                   {/* Red Icon (Globe/Language) */}
                   {course.theme === 'red' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>}
                </div>
                <h3>{course.title}</h3>
              </div>
              
              <ul className="feature-list">
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
                    Sign up for the first lesson
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