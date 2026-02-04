import React from 'react';

// We accept 'onOpenModal' to open the popup when clicking ANY 'Sign up' button
const Courses = ({ onOpenModal }) => {
  const courseData = [
    {
      id: 1, theme: 'blue', title: 'Intensive Beginner',
      features: [ 
        'You will learn over 1000 vital English words, expressions and idioms.', 
        'You will learn to think in English and to speak English fluently.', 
        'You will learn to understand movies and TV shows in English.', 
        'After the course, you can start preparing for tests like TOEFL, IELTS, etc.' 
      ]
    },
    {
      id: 2, theme: 'orange', title: 'Intermediate',
      features: [ 
        'You will learn to think and speak English at an advanced level.', 
        'You will start feeling English grammar like a native.', 
        'You will learn over 5000 amazing English words and idioms.', 
        'Start preparing for professional exams like TOEFL, IELTS, GMAT.' 
      ]
    },
    {
      id: 3, theme: 'green', title: 'Advanced',
      features: [ 
        'Describe personalities; express likes/dislikes; agree and disagree on topics.', 
        'Make direct and indirect requests effectively.', 
        'Talk about moving abroad and describe cultural expectations.', 
        'Describe jobs and discuss positive/negative aspects of careers.' 
      ]
    },
    {
      id: 4, theme: 'red', title: 'Chinese Language',
      features: [ 
        'Master the Pinyin system and the 4 tones of Mandarin pronunciation.', 
        'Learn essential vocabulary and phrases for daily conversations.', 
        'Introduction to reading and writing basic Chinese characters (Hanzi).', 
        'Explore Chinese culture, festivals, and traditions.' 
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
                   {/* Blue Icon */}
                   {course.theme === 'blue' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>}
                   
                   {/* Orange Icon */}
                   {course.theme === 'orange' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>}
                   
                   {/* Green Icon */}
                   {course.theme === 'green' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}

                   {/* Red Icon (Chinese) */}
                   {course.theme === 'red' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>}
                </div>
                <h3>{course.title}</h3>
              </div>
              
              <ul className="feature-list">
                {course.features.map((feature, index) => (
                  <li key={index}>
                    <span className="check-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="card-footer">
                {/* Connected the Modal Here 👇 */}
                <button className="btn-full-width" onClick={onOpenModal}>
                    Sign up for the first lesson
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;