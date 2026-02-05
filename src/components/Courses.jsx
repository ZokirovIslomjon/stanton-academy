import React from 'react';

// Helper function to get colors based on the theme
const getThemeClasses = (theme) => {
  switch (theme) {
    case 'blue': return 'bg-blue-100 text-blue-600 border-blue-100';
    case 'orange': return 'bg-orange-100 text-orange-600 border-orange-100';
    case 'green': return 'bg-green-100 text-green-600 border-green-100';
    case 'red': return 'bg-red-100 text-red-600 border-red-100';
    default: return 'bg-gray-100 text-gray-600 border-gray-100';
  }
};

const getButtonClasses = (theme) => {
    switch (theme) {
      case 'blue': return 'bg-blue-600 hover:bg-blue-700';
      case 'orange': return 'bg-orange-500 hover:bg-orange-600';
      case 'green': return 'bg-green-600 hover:bg-green-700';
      case 'red': return 'bg-red-600 hover:bg-red-700';
      default: return 'bg-gray-900 hover:bg-gray-800';
    }
  };

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
    <section className="py-16 bg-white" id="courses">
      <div className="container mx-auto px-4">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-orange-500">Courses</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Discover the courses available and choose the one that suits you best
          </p>
        </div>

        {/* --- THE RESPONSIVE CONTAINER ---
            Mobile: Flex + Overflow (Swipe)
            Desktop: Grid (4 Columns)
        */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 w-full no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:overflow-visible">
          
          {courseData.map((course) => (
            <div 
                key={course.id} 
                className="min-w-[85%] snap-center bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col md:min-w-0 md:w-auto hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-8 flex-grow">
                
                {/* --- CARD HEADER (Icon + Title) --- */}
                <div className="flex flex-col items-start mb-6">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${getThemeClasses(course.theme)}`}>
                        {/* Blue Icon */}
                        {course.theme === 'blue' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>}
                        
                        {/* Orange Icon */}
                        {course.theme === 'orange' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>}
                        
                        {/* Green Icon */}
                        {course.theme === 'green' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}

                        {/* Red Icon (Chinese) */}
                        {course.theme === 'red' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                </div>
                
                {/* --- FEATURES LIST --- */}
                <ul className="space-y-4 mb-6">
                    {course.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600 leading-relaxed">
                        <span className={`mr-3 mt-0.5 flex-shrink-0 ${course.theme === 'blue' ? 'text-blue-500' : course.theme === 'orange' ? 'text-orange-500' : course.theme === 'green' ? 'text-green-500' : 'text-red-500'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        {feature}
                    </li>
                    ))}
                </ul>
              </div>

              {/* --- CARD FOOTER (Button) --- */}
              <div className="p-8 pt-0 mt-auto">
                <button 
                    className={`w-full py-3 rounded-xl text-white font-semibold shadow-md transition transform active:scale-95 ${getButtonClasses(course.theme)}`}
                    onClick={onOpenModal}
                >
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