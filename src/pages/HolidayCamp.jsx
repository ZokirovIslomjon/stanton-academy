import React from 'react';
import { Link } from 'react-router-dom';

// ─── Trip destination data ────────────────────────────────────────────────────
// Replace the src values with your actual local images later
// e.g. import cityTour from '../assets/trips/city-tour.jpg'
// For now we use high-quality Unsplash photos for each destination

const TRIPS = [
  {
    name: 'City Tour',
    src: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&q=80',
    desc: 'Experience the vibrant culture, iconic landmarks and hidden gems.',
  },
  {
    name: 'Batu Caves',
    src: 'https://images.unsplash.com/photo-1602153508972-9203f6d08e50?w=400&q=80',
    desc: 'Explore the majestic caves and immerse in spiritual and cultural heritage.',
  },
  {
    name: 'Sunway Lagoon',
    src: 'https://images.unsplash.com/photo-1570697196432-f1e1038a90ab?w=400&q=80',
    desc: 'Fun-filled adventures and excitement for the whole family.',
  },
  {
    name: 'Genting Highlands',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    desc: 'Breathtaking views, cool weather and world class entertainment.',
  },
  {
    name: 'Melaka Trip',
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    desc: 'Step back in time and discover rich history and heritage.',
  },
  {
    name: 'Port Dickson',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
    desc: 'Relax on the sandy beaches and enjoy the coastal charm.',
  },
];

// ─── Student photo placeholder colors (replace with real photos) ──────────────
const STUDENT_COLORS = ['#fce7f3', '#d1fae5', '#dbeafe', '#fef3c7', '#ede9fe', '#fee2e2'];
const STUDENT_INITIALS = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'];

export default function HolidayCampHero() {
  return (
    <div className="hch-wrap">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

        .hch-wrap { font-family: 'Poppins', sans-serif; overflow-x: hidden; }

        /* ══════════════════════════════════════════
           HERO SECTION
        ══════════════════════════════════════════ */
        .hch-hero {
          background: linear-gradient(160deg, #f0fdf6 0%, #ffffff 40%, #fef9ee 100%);
          padding: 72px 24px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        /* soft blobs */
        .hch-hero::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,199,44,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .hch-hero::after {
          content: '';
          position: absolute;
          bottom: 60px; left: -100px;
          width: 350px; height: 350px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,107,63,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .hch-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,107,63,0.08);
          border: 1px solid rgba(0,107,63,0.15);
          color: #006B3F;
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.05em;
          padding: 6px 16px; border-radius: 50px;
          margin-bottom: 22px;
        }
        .hch-eyebrow span { color: #FFC72C; font-size: 1rem; }

        .hch-hero-title {
          font-size: clamp(2.2rem, 5.5vw, 4rem);
          font-weight: 900;
          color: #0f1f14;
          line-height: 1.1;
          letter-spacing: -0.025em;
          max-width: 760px;
          margin: 0 auto 18px;
        }
        .hch-hero-title em {
          font-style: normal;
          color: #006B3F;
          position: relative;
        }
        .hch-hero-title em::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 0; right: 0;
          height: 3px;
          background: #FFC72C;
          border-radius: 2px;
          opacity: 0.7;
        }

        .hch-hero-sub {
          color: #6b7280;
          font-size: clamp(0.9rem, 1.8vw, 1.05rem);
          max-width: 520px;
          margin: 0 auto 36px;
          line-height: 1.7;
        }

        .hch-hero-btns {
          display: flex; gap: 12px;
          justify-content: center; flex-wrap: wrap;
          margin-bottom: 56px;
        }
        .hch-btn-main {
          display: inline-flex; align-items: center; gap: 8px;
          background: #006B3F; color: white;
          padding: 13px 28px; border-radius: 50px;
          font-weight: 700; font-size: 0.92rem;
          text-decoration: none;
          transition: all 0.22s;
          box-shadow: 0 4px 18px rgba(0,107,63,0.3);
        }
        .hch-btn-main:hover { background: #004d2c; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,107,63,0.35); }
        .hch-btn-main-arrow {
          background: #FFC72C; color: #004d2c;
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; flex-shrink: 0;
        }
        .hch-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: white; color: #374151;
          padding: 13px 28px; border-radius: 50px;
          font-weight: 600; font-size: 0.92rem;
          text-decoration: none;
          border: 1.5px solid #e5e7eb;
          transition: all 0.22s;
        }
        .hch-btn-ghost:hover { border-color: #006B3F; color: #006B3F; transform: translateY(-2px); }
        .hch-btn-ghost-arrow {
          background: #f3f4f6; color: #374151;
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem;
        }

        /* ── Student frames row ── */
        .hch-students {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 12px;
          padding: 0 16px;
          flex-wrap: nowrap;
          overflow: hidden;
        }

        .hch-student-frame {
          flex: 0 0 auto;
          width: clamp(100px, 13vw, 155px);
          height: clamp(130px, 17vw, 200px);
          border-radius: 999px; /* full pill */
          overflow: hidden;
          position: relative;
          transition: transform 0.3s ease;
        }
        .hch-student-frame:hover { transform: translateY(-8px); }

        /* Alternate vertical offsets for staggered look */
        .hch-student-frame:nth-child(1) { margin-bottom: 0px; }
        .hch-student-frame:nth-child(2) { margin-bottom: 20px; }
        .hch-student-frame:nth-child(3) { margin-bottom: 10px; }
        .hch-student-frame:nth-child(4) { margin-bottom: 30px; }
        .hch-student-frame:nth-child(5) { margin-bottom: 15px; }
        .hch-student-frame:nth-child(6) { margin-bottom: 5px; }

        .hch-student-inner {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 1.1rem; color: #6b7280;
          position: relative;
        }
        .hch-student-inner img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top center;
        }
        /* placeholder dashed border when no image */
        .hch-student-placeholder {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          border: 2.5px dashed rgba(0,107,63,0.25);
          border-radius: 999px;
          gap: 6px;
        }
        .hch-student-placeholder-icon {
          font-size: 1.8rem; opacity: 0.5;
        }
        .hch-student-placeholder-text {
          font-size: 0.65rem; color: #9ca3af; text-align: center;
          line-height: 1.3;
        }

        /* ══════════════════════════════════════════
           TRIPS SECTION
        ══════════════════════════════════════════ */
        .hch-trips {
          background: #0f1f14;
          padding: 80px 24px;
          overflow: hidden;
        }

        .hch-trips-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .hch-trips-eyebrow {
          display: inline-block;
          color: #FFC72C;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          margin-bottom: 12px;
        }
        .hch-trips-title {
          font-size: clamp(1.6rem, 3.5vw, 2.6rem);
          font-weight: 800; color: white;
          line-height: 1.2;
        }
        .hch-trips-title em {
          font-style: italic;
          font-family: 'Playfair Display', serif;
          color: #FFC72C;
        }

        /* horizontal scroll row */
        .hch-trips-row {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: nowrap;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: none;
        }
        .hch-trips-row::-webkit-scrollbar { display: none; }

        .hch-trip-card {
          flex: 0 0 auto;
          width: clamp(150px, 18vw, 210px);
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: transform 0.3s ease;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }
        .hch-trip-card:hover { transform: translateY(-6px) scale(1.02); }

        /* stagger heights for organic feel */
        .hch-trip-card:nth-child(odd)  { height: clamp(260px, 32vw, 380px); }
        .hch-trip-card:nth-child(even) { height: clamp(230px, 28vw, 340px); margin-top: 30px; }

        .hch-trip-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .hch-trip-card:hover .hch-trip-img { transform: scale(1.06); }

        /* gradient overlay */
        .hch-trip-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.05) 0%,
            rgba(0,0,0,0.1) 40%,
            rgba(0,0,0,0.75) 100%
          );
        }

        .hch-trip-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 20px 16px;
        }
        .hch-trip-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(0.95rem, 1.5vw, 1.15rem);
          font-weight: 700; color: white;
          margin-bottom: 6px;
          line-height: 1.2;
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }
        .hch-trip-desc {
          font-size: clamp(0.65rem, 1vw, 0.75rem);
          color: rgba(255,255,255,0.82);
          line-height: 1.5;
        }
        .hch-trip-divider {
          width: 28px; height: 2px;
          background: #FFC72C;
          border-radius: 2px;
          margin-bottom: 8px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .hch-hero { padding: 56px 16px 0; }
          .hch-students { gap: 8px; }
          .hch-student-frame { width: 80px; height: 110px; }
          .hch-trips-row { justify-content: flex-start; padding: 0 16px 8px; }
          .hch-trip-card { width: 150px; }
          .hch-trip-card:nth-child(odd)  { height: 240px; }
          .hch-trip-card:nth-child(even) { height: 210px; margin-top: 20px; }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <section className="hch-hero">

        <div className="hch-eyebrow">
          <span>✦</span>
          For Ages 8–15+ · Kuala Lumpur, Malaysia · July & August 2026
        </div>

        <h1 className="hch-hero-title">
          Adventure, culture and <em>lifelong memories</em><br/>
          in the heart of Malaysia.
        </h1>

        <p className="hch-hero-sub">
          Join Stanton Academy's Holiday Camp — an immersive journey packed with English learning,
          cultural discovery, and unforgettable trips across Malaysia.
        </p>

        <div className="hch-hero-btns">
          <Link to="/signup" className="hch-btn-main">
            Register Now
            <span className="hch-btn-main-arrow">→</span>
          </Link>
          <a href="#packages" className="hch-btn-ghost">
            View Packages
            <span className="hch-btn-ghost-arrow">↗</span>
          </a>
        </div>

        {/* Student frames — replace background colors with real photos */}
        <div className="hch-students">
          {STUDENT_COLORS.map((color, i) => (
            <div key={i} className="hch-student-frame" style={{ background: color }}>
              {/* 
                TO ADD REAL PHOTOS:
                Replace the placeholder div below with:
                <img src={studentPhoto1} alt="Student" />
                
                Import at top of file:
                import studentPhoto1 from '../assets/students/student1.jpg';
              */}
              <div className="hch-student-placeholder">
                <div className="hch-student-placeholder-icon">👤</div>
                <div className="hch-student-placeholder-text">Add<br/>student<br/>photo</div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ══ TRIPS ══ */}
      <section className="hch-trips" id="trips">
        <div className="hch-trips-header">
          <div className="hch-trips-eyebrow">Trips & Activities</div>
          <h2 className="hch-trips-title">
            Fall in Love with <em>Trips & Activities</em>
          </h2>
        </div>

        <div className="hch-trips-row">
          {TRIPS.map((trip, i) => (
            <div key={i} className="hch-trip-card">
              <img
                src={trip.src}
                alt={trip.name}
                className="hch-trip-img"
                onError={e => {
                  // fallback gradient if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.style.background =
                    'linear-gradient(160deg, #006B3F, #1a5c35)';
                }}
              />
              <div className="hch-trip-overlay" />
              <div className="hch-trip-content">
                <div className="hch-trip-name">{trip.name}</div>
                <div className="hch-trip-divider" />
                <div className="hch-trip-desc">{trip.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}