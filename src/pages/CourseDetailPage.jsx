import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Courses from '../components/Courses';

// Generic course detail page: fixed layout matching GeneralEnglishPage.jsx / IELTSPreparationPage.jsx.
// Every course without a custom "Page Link" routes here (see AdminCourses.jsx) — content comes from
// the `courses` row, admin only controls text/features/image/accent color, never layout.
export default function CourseDetailPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    let cancelled = false;

    async function load() {
      setLoading(true);
      setNotFound(false);

      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (cancelled) return;
      if (error || !data) {
        setNotFound(true);
      } else {
        setCourse(data);
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return <main style={{ padding: '160px 20px 80px', textAlign: 'center' }}>Loading...</main>;
  }

  if (notFound) {
    return (
      <main style={{ padding: '160px 20px 80px', textAlign: 'center' }}>
        <h1>Course not found</h1>
        <p>
          <Link to="/courses">Back to courses</Link>
        </p>
      </main>
    );
  }

  const accent = course.accent_color || '#006B3F';

  return (
    <main className="cdp-page-wrapper">
      <style>{`
        .cdp-page-wrapper {
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

        .cdp-page-wrapper::before {
          content: ''; position: absolute; top: -10vw; left: -10vw; width: 60vw; height: 60vw;
          background: radial-gradient(circle, ${hexToRgba(accent, 0.08)} 0%, transparent 65%);
          z-index: -1; pointer-events: none;
        }
        .cdp-page-wrapper::after {
          content: ''; position: absolute; top: 10vw; right: -15vw; width: 60vw; height: 60vw;
          background: radial-gradient(circle, rgba(255, 199, 44, 0.08) 0%, transparent 65%);
          z-index: -1; pointer-events: none;
        }

        .cdp-header { text-align: center; margin-bottom: 60px; padding: 0 20px; }
        .cdp-header h1 {
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 15px;
          color: ${accent};
        }
        .cdp-header p {
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 600;
          margin-bottom: 0;
          color: ${accent};
        }

        .cdp-content-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: flex-start;
        }

        .cdp-image-wrapper {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          position: sticky;
          top: 100px;
          background: #f3f3f3;
          aspect-ratio: 4/3;
        }
        .cdp-image { width: 100%; height: 100%; display: block; object-fit: cover; }

        .cdp-details { text-align: left; }
        .cdp-details h2 { font-size: 1.8rem; font-weight: 800; color: #111; margin-bottom: 20px; line-height: 1.3; }
        .cdp-details p.overview { font-size: 1.05rem; color: #555; line-height: 1.7; margin-bottom: 30px; }

        .cdp-info-bar {
          display: flex;
          gap: 30px;
          background: #ffffff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          margin-bottom: 30px;
          border-left: 4px solid ${accent};
        }
        .cdp-info-item { display: flex; flex-direction: column; }
        .cdp-info-label {
          font-size: 0.85rem; color: #888; text-transform: uppercase; font-weight: 700;
          letter-spacing: 1px; margin-bottom: 4px;
        }
        .cdp-info-value { font-size: 1rem; font-weight: 600; color: #111; }

        .cdp-section-title {
          font-size: 1.2rem; font-weight: 800; color: #111; margin-bottom: 15px;
          display: flex; align-items: center; gap: 10px;
        }
        .cdp-section-title::before {
          content: ''; display: block; width: 4px; height: 20px;
          background-color: ${accent}; border-radius: 4px;
        }

        .cdp-list { list-style: none; padding: 0; margin-bottom: 30px; }
        .cdp-list li { position: relative; padding-left: 30px; margin-bottom: 12px; font-size: 1rem; color: #444; line-height: 1.5; }
        .cdp-list li::before { content: '•'; position: absolute; left: 0; top: -2px; color: ${accent}; font-size: 1.5rem; }

        .cdp-text-block { margin-bottom: 25px; background: #f9f9f9; padding: 20px; border-radius: 12px; }
        .cdp-text-block strong { color: #111; font-size: 1.05rem; display: block; margin-bottom: 5px; }
        .cdp-text-block p { color: #555; margin: 0; font-size: 0.95rem; line-height: 1.6; }

        .cdp-cta-container { text-align: center; margin-top: 80px; margin-bottom: 80px; padding: 0 20px; }
        .cdp-cta-container p { font-size: 1.1rem; font-weight: 600; color: #111; margin-bottom: 25px; }
        .cdp-cta-btn {
          display: inline-block; background-color: transparent; color: #111; padding: 14px 40px;
          border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1px; text-decoration: none; transition: all 0.3s;
        }
        .cdp-cta-btn:hover {
          border-color: ${accent}; color: ${accent}; background-color: #ffffff;
          box-shadow: 0 10px 20px ${hexToRgba(accent, 0.1)};
        }

        .cdp-other-courses-divider { width: 100%; height: 1px; background: #e5e7eb; margin-bottom: 40px; }

        @media (max-width: 900px) {
          .cdp-content-container { grid-template-columns: 1fr; gap: 40px; }
          .cdp-image-wrapper { position: static; }
          .cdp-info-bar { flex-direction: column; gap: 15px; }
        }
      `}</style>

      <div className="cdp-header">
        <h1>{course.title}</h1>
        {course.tagline && <p>{course.tagline}</p>}
      </div>

      <div className="cdp-content-container">
        {course.image_url && (
          <div className="cdp-image-wrapper">
            <img src={course.image_url} alt={course.title} className="cdp-image" />
          </div>
        )}

        <div className="cdp-details" style={course.image_url ? undefined : { gridColumn: '1 / -1' }}>
          <h2>{course.title}</h2>
          {course.overview && <p className="overview">{course.overview}</p>}

          {(course.frequency || course.duration) && (
            <div className="cdp-info-bar">
              {course.frequency && (
                <div className="cdp-info-item">
                  <span className="cdp-info-label">Frequency</span>
                  <span className="cdp-info-value">{course.frequency}</span>
                </div>
              )}
              {course.duration && (
                <div className="cdp-info-item">
                  <span className="cdp-info-label">Duration</span>
                  <span className="cdp-info-value">{course.duration}</span>
                </div>
              )}
            </div>
          )}

          {course.features && course.features.length > 0 && (
            <>
              <div className="cdp-section-title">Focus Areas</div>
              <ul className="cdp-list">
                {course.features.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {course.best_for && (
            <div className="cdp-text-block">
              <strong>Best For</strong>
              <p>{course.best_for}</p>
            </div>
          )}

          {course.outcome && (
            <div className="cdp-text-block">
              <strong>Outcome</strong>
              <p>{course.outcome}</p>
            </div>
          )}
        </div>
      </div>

      <div className="cdp-cta-container">
        <p>Ready to get started? Secure your spot today.</p>
        <Link to="/signup" className="cdp-cta-btn">
          Enquire Now
        </Link>
      </div>

      <div className="cdp-other-courses-divider"></div>
      <Courses />
    </main>
  );
}

function hexToRgba(hex, alpha) {
  const clean = (hex || '#006B3F').replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const bigint = parseInt(full, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
