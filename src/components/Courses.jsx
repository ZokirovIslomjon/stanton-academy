import React from 'react';

const Courses = () => {
  const courseData = [
    {
      id: 1,
      theme: 'blue',
      title: 'General English',
      features: [
        'The course spans 4 levels (Beginner to Intermediate), each lasting 3 months.',
        'Classes are held 3 times a week for 80 minutes.',
        'Free textbooks and a custom workbook are provided to students.',
        'Sunday events include Movie Day, Conversation Club, and parties.',
        'The cost includes a support teacher on missed classes.'
      ]
    },
    {
      id: 2,
      theme: 'orange',
      title: 'IELTS Level 1',
      features: [
        'Gain basic knowledge about the IELTS format.',
        'Learn strategies to effectively tackle the IELTS test.',
        'Participate in mock tests to simulate the real IELTS exam experience.',
        'Each class session lasts for 80 minutes.',
        'Flexibility to participate in both online and in-person classes.',
        'Engage in speaking clubs every Sunday.'
      ]
    },
    {
      id: 3,
      theme: 'green',
      title: 'IELTS Level 2',
      features: [
        'Learn about IELTS in more detail.',
        'Learn more comprehensive strategies to effectively tackle the test.',
        'Participate in mock tests to simulate the real IELTS exam experience.',
        'Each class session lasts for 80 minutes.',
        'Every student receives books and copybooks at no additional cost.',
        'Engage in speaking clubs and events every Sunday.'
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
              
              {/* Header with Icon */}
              <div className="card-header">
                <div className="icon-circle">
                   {course.theme === 'blue' && (
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                   )}
                   {course.theme === 'orange' && (
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                   )}
                   {course.theme === 'green' && (
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                   )}
                </div>
                <h3>{course.title}</h3>
              </div>

              {/* List of Features */}
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

              {/* Button at bottom */}
              <div className="card-footer">
                <button className="btn-full-width">Sign up for the first lesson</button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;