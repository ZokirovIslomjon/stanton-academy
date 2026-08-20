import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const Courses = ({ onOpenModal }) => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadCourses() {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (cancelled) return;
      if (error) {
        console.error('Failed to load courses:', error.message);
      } else {
        setCourseData(data || []);
      }
      setLoading(false);
    }

    loadCourses();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="courses-section" id="courses">
      <div className="container">
        <div className="section-header">
          <h2>Our <span>Courses</span></h2>
          <p>Discover the courses available and choose the one that suits you best</p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading courses...</p>
        ) : (
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
              
              <div className="course-info-block" style={{ textAlign: 'center', padding: '0 20px 20px 20px', borderBottom: '1px solid #f3f4f6', marginBottom: '20px' }}>
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
                {(course.features || []).map((feature, index) => (
                  <li key={index}>
                    <span className="check-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="card-footer">
                <Link to={course.link || "/signup"} className="btn-full-width">
                    {course.btn_text || "Sign up"}
                </Link>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default Courses;