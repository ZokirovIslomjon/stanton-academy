import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PACKAGES = [
  {
    name: 'Economy',
    color: '#4A90D9',
    price: 'RM 4,900',
    promo: 'RM 4,195',
    deposit: 'RM 950',
    highlight: false,
    features: {
      course: true, lunch: false, airport: true, tshirt: true,
      sim: true, farewell: true, room: 'Upon Request',
      tours: false,
    }
  },
  {
    name: 'Bronze',
    color: '#CD7F32',
    price: 'RM 7,900',
    promo: 'RM 6,745',
    deposit: 'RM 950',
    highlight: false,
    features: {
      course: true, lunch: true, airport: true, tshirt: true,
      sim: true, farewell: true, room: 'Small Room',
      tours: true,
    }
  },
  {
    name: 'Silver',
    color: '#A8A9AD',
    price: 'RM 9,400',
    promo: 'RM 8,020',
    deposit: 'RM 950',
    highlight: false,
    features: {
      course: true, lunch: true, airport: true, tshirt: true,
      sim: true, farewell: true, room: 'Small Room',
      tours: true,
    }
  },
  {
    name: 'Gold',
    color: '#FFC72C',
    price: 'RM 9,900',
    promo: 'RM 8,445',
    deposit: 'RM 950',
    highlight: true,
    features: {
      course: true, lunch: true, airport: true, tshirt: true,
      sim: true, farewell: true, room: 'Middle Room',
      tours: true,
    }
  },
  {
    name: 'Platinum',
    color: '#E8E8E8',
    price: 'RM 10,600',
    promo: 'RM 9,040',
    deposit: 'RM 950',
    highlight: false,
    features: {
      course: true, lunch: true, airport: true, tshirt: true,
      sim: true, farewell: true, room: 'Master Room',
      tours: true,
    }
  },
];

const TRIPS = [
  { name: 'City Tour & Batu Caves', emoji: '🏛️', desc: 'Explore KL landmarks and majestic cave temples' },
  { name: 'Sunway Lagoon', emoji: '🎢', desc: 'Fun-filled water park adventures for everyone' },
  { name: 'Genting Highlands', emoji: '🌫️', desc: 'Breathtaking views and world-class entertainment' },
  { name: 'Port Dickson', emoji: '🏖️', desc: 'Relax on sandy beaches and enjoy coastal charm' },
  { name: 'Melaka Trip', emoji: '🏰', desc: 'Step back in time and discover rich heritage' },
  { name: 'Movie Night', emoji: '🎬', desc: 'Cinematic evenings with fellow campers' },
  { name: 'Sport Day', emoji: '⚽', desc: 'Action-packed games and team competitions' },
  { name: 'Culture Night', emoji: '🎭', desc: 'Celebrate Malaysian culture and traditions' },
];

const HIGHLIGHTS = [
  { icon: '🌍', title: 'Ages 8–15+', desc: 'Designed for kids and teenagers' },
  { icon: '📅', title: 'Up to 1 Month', desc: 'July & August 2026 programs' },
  { icon: '🏙️', title: 'Heart of KL', desc: 'Jalan Pudu, steps from Bukit Bintang' },
  { icon: '🚇', title: 'Easy Access', desc: 'Direct LRT, MRT & bus connections' },
  { icon: '👨‍🏫', title: 'Expert Teachers', desc: 'Certified native English speakers' },
  { icon: '🎓', title: 'Learn & Explore', desc: 'English + cultural adventures combined' },
];

function CheckIcon({ yes }) {
  if (yes === true) return <span style={{ color: '#006B3F', fontSize: '1.1rem' }}>✅</span>;
  if (yes === false) return <span style={{ color: '#ef4444', fontSize: '1.1rem' }}>❌</span>;
  return <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>{yes}</span>;
}

export default function HolidayCamp() {
  const [activeTab, setActiveTab] = useState('july');

  return (
    <div className="hc-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');

        :root {
          --green:       #006B3F;
          --green-dark:  #004d2c;
          --green-light: #e6f4ed;
          --gold:        #FFC72C;
          --gold-dark:   #c49a00;
          --white:       #ffffff;
          --gray-50:     #f9fafb;
          --gray-100:    #f3f4f6;
          --gray-200:    #e5e7eb;
          --gray-600:    #4b5563;
          --gray-800:    #1f2937;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        .hc-page { font-family: 'Poppins', sans-serif; color: var(--gray-800); overflow-x: hidden; }

        /* ── HERO ── */
        .hc-hero {
          min-height: 100vh;
          background: linear-gradient(160deg, var(--green-dark) 0%, var(--green) 50%, #1a5c35 100%);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 80px 20px 60px; position: relative; overflow: hidden;
        }
        .hc-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 70% 30%, rgba(255,199,44,0.15) 0%, transparent 60%),
                      radial-gradient(ellipse at 20% 80%, rgba(255,199,44,0.08) 0%, transparent 50%);
          pointer-events: none;
        }
        .hc-hero-badge {
          display: inline-block;
          background: rgba(255,199,44,0.15);
          border: 1.5px solid rgba(255,199,44,0.5);
          color: var(--gold);
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em;
          padding: 6px 18px; border-radius: 50px; text-transform: uppercase;
          margin-bottom: 24px;
        }
        .hc-hero-sub {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          color: rgba(255,255,255,0.8); font-weight: 700;
          margin-bottom: 8px; font-style: italic;
        }
        .hc-hero-title {
          font-size: clamp(3.5rem, 10vw, 7rem);
          font-weight: 900; color: var(--white);
          line-height: 0.95; letter-spacing: -0.02em;
          margin-bottom: 6px;
          text-shadow: 0 4px 30px rgba(0,0,0,0.3);
        }
        .hc-hero-title span {
          color: var(--gold);
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 6vw, 4.5rem);
          font-style: italic; font-weight: 700;
          letter-spacing: 0.02em;
        }
        .hc-hero-country {
          color: rgba(255,255,255,0.6);
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          letter-spacing: 0.4em; text-transform: uppercase;
          margin-bottom: 32px;
        }
        .hc-hero-tagline {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          color: rgba(255,255,255,0.85); font-weight: 400;
          max-width: 520px; line-height: 1.7; margin-bottom: 40px;
        }
        .hc-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
        .hc-btn-primary {
          background: var(--gold); color: var(--green-dark);
          padding: 14px 32px; border-radius: 50px;
          font-weight: 700; font-size: 0.95rem; text-decoration: none;
          transition: all 0.2s; border: none; cursor: pointer;
          box-shadow: 0 4px 20px rgba(255,199,44,0.4);
        }
        .hc-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(255,199,44,0.5); background: #ffd44a; }
        .hc-btn-outline {
          background: transparent; color: var(--white);
          padding: 14px 32px; border-radius: 50px;
          font-weight: 600; font-size: 0.95rem; text-decoration: none;
          border: 2px solid rgba(255,255,255,0.4); cursor: pointer;
          transition: all 0.2s;
        }
        .hc-btn-outline:hover { border-color: white; background: rgba(255,255,255,0.1); }
        .hc-hero-pills {
          position: absolute; bottom: 32px;
          display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;
          padding: 0 20px;
        }
        .hc-hero-pill {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.85);
          font-size: 0.78rem; font-weight: 500;
          padding: 6px 14px; border-radius: 50px;
        }

        /* ── SECTIONS ── */
        .hc-section { padding: 80px 20px; }
        .hc-section--gray { background: var(--gray-50); }
        .hc-section--green { background: var(--green); }
        .hc-container { max-width: 1100px; margin: 0 auto; }
        .hc-section-label {
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--gold-dark);
          margin-bottom: 10px;
        }
        .hc-section-title {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800; line-height: 1.15;
          color: var(--gray-800); margin-bottom: 16px;
        }
        .hc-section-title--white { color: white; }
        .hc-section-desc {
          font-size: 1rem; color: var(--gray-600);
          line-height: 1.7; max-width: 600px;
        }
        .hc-section-desc--white { color: rgba(255,255,255,0.8); }
        .hc-section-header { margin-bottom: 50px; }

        /* ── ABOUT ── */
        .hc-about-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 60px; align-items: center;
        }
        .hc-about-text h2 { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 800; margin-bottom: 18px; line-height: 1.2; }
        .hc-about-text h2 em { font-style: normal; color: var(--green); }
        .hc-about-text p { color: var(--gray-600); line-height: 1.8; margin-bottom: 16px; font-size: 0.95rem; }
        .hc-about-stats {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 16px; margin-top: 32px;
        }
        .hc-stat-card {
          background: var(--green-light);
          border-radius: 16px; padding: 20px;
          border-left: 4px solid var(--green);
        }
        .hc-stat-num { font-size: 1.8rem; font-weight: 800; color: var(--green); line-height: 1; }
        .hc-stat-label { font-size: 0.8rem; color: var(--gray-600); margin-top: 4px; }
        .hc-highlights-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        .hc-highlight-card {
          background: white; border-radius: 14px;
          padding: 18px; display: flex; gap: 12px; align-items: flex-start;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          border: 1px solid var(--gray-200);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hc-highlight-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.1); }
        .hc-highlight-icon { font-size: 1.5rem; flex-shrink: 0; }
        .hc-highlight-title { font-weight: 700; font-size: 0.85rem; color: var(--gray-800); }
        .hc-highlight-desc { font-size: 0.75rem; color: var(--gray-600); margin-top: 2px; }

        /* ── TRIPS ── */
        .hc-trips-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        .hc-trip-card {
          background: white; border-radius: 18px;
          padding: 24px 18px; text-align: center;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
          border: 1px solid var(--gray-200);
          transition: all 0.25s;
        }
        .hc-trip-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,107,63,0.15); border-color: var(--green); }
        .hc-trip-emoji { font-size: 2.2rem; margin-bottom: 10px; }
        .hc-trip-name { font-weight: 700; font-size: 0.88rem; color: var(--gray-800); margin-bottom: 6px; }
        .hc-trip-desc { font-size: 0.75rem; color: var(--gray-600); line-height: 1.5; }

        /* ── ITINERARY ── */
        .hc-tabs { display: flex; gap: 8px; margin-bottom: 32px; flex-wrap: wrap; }
        .hc-tab {
          padding: 10px 28px; border-radius: 50px;
          font-weight: 600; font-size: 0.88rem; cursor: pointer;
          border: 2px solid var(--gray-200); background: white;
          color: var(--gray-600); transition: all 0.2s;
        }
        .hc-tab--active { background: var(--green); color: white; border-color: var(--green); }
        .hc-calendar {
          background: white; border-radius: 20px;
          overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        }
        .hc-cal-header {
          background: var(--green); color: white;
          display: grid; grid-template-columns: repeat(7, 1fr);
          text-align: center;
        }
        .hc-cal-day-name { padding: 12px 4px; font-size: 0.78rem; font-weight: 600; }
        .hc-cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); }
        .hc-cal-cell {
          min-height: 72px; padding: 8px 6px;
          border: 1px solid var(--gray-100);
          font-size: 0.78rem; position: relative;
        }
        .hc-cal-cell--empty { background: var(--gray-50); }
        .hc-cal-num { font-weight: 600; color: var(--gray-600); font-size: 0.8rem; }
        .hc-cal-event {
          margin-top: 4px; padding: 3px 6px;
          border-radius: 6px; font-size: 0.65rem; font-weight: 600;
          line-height: 1.3;
        }
        .hc-event--arrival   { background: #dbeafe; color: #1e40af; }
        .hc-event--start     { background: #d1fae5; color: #065f46; }
        .hc-event--trip      { background: #fef3c7; color: #92400e; }
        .hc-event--night     { background: #ede9fe; color: #5b21b6; }
        .hc-event--sport     { background: #fee2e2; color: #991b1b; }
        .hc-event--farewell  { background: #ecfccb; color: #3f6212; }

        /* ── PACKAGES ── */
        .hc-packages-grid {
          display: grid; grid-template-columns: repeat(5, 1fr);
          gap: 14px; align-items: start;
        }
        .hc-pkg-card {
          background: white; border-radius: 20px;
          padding: 24px 16px; text-align: center;
          border: 2px solid var(--gray-200);
          transition: all 0.25s; position: relative;
        }
        .hc-pkg-card--popular {
          border-color: var(--gold);
          box-shadow: 0 8px 32px rgba(255,199,44,0.25);
          transform: translateY(-8px);
        }
        .hc-popular-badge {
          position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
          background: var(--gold); color: var(--green-dark);
          font-size: 0.65rem; font-weight: 800; padding: 4px 12px;
          border-radius: 50px; white-space: nowrap; letter-spacing: 0.05em;
        }
        .hc-pkg-dot {
          width: 14px; height: 14px; border-radius: 50%;
          margin: 0 auto 10px;
        }
        .hc-pkg-name { font-weight: 800; font-size: 1rem; margin-bottom: 12px; }
        .hc-pkg-price-old { font-size: 0.78rem; color: var(--gray-600); text-decoration: line-through; }
        .hc-pkg-price-new { font-size: 1.3rem; font-weight: 800; color: var(--green); margin: 4px 0; }
        .hc-pkg-deposit { font-size: 0.72rem; color: var(--gray-600); margin-bottom: 16px; }
        .hc-pkg-divider { border: none; border-top: 1px solid var(--gray-200); margin: 14px 0; }
        .hc-pkg-features { text-align: left; }
        .hc-pkg-feature {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.72rem; color: var(--gray-600);
          padding: 4px 0;
        }
        .hc-pkg-cta {
          display: block; margin-top: 18px;
          background: var(--green); color: white;
          padding: 10px; border-radius: 50px;
          font-weight: 700; font-size: 0.8rem;
          text-decoration: none; transition: all 0.2s;
        }
        .hc-pkg-cta:hover { background: var(--green-dark); }
        .hc-pkg-card--popular .hc-pkg-cta { background: var(--gold); color: var(--green-dark); }
        .hc-pkg-card--popular .hc-pkg-cta:hover { background: #ffd44a; }
        .hc-discount-note {
          text-align: center; margin-top: 24px;
          background: #fef9e7; border: 1px solid #fde68a;
          border-radius: 12px; padding: 14px;
          font-size: 0.85rem; color: #92400e;
        }

        /* ── TERMS ── */
        .hc-terms-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .hc-term-card {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 16px; padding: 24px;
        }
        .hc-term-num { font-size: 2rem; font-weight: 900; color: var(--gold); opacity: 0.6; line-height: 1; margin-bottom: 8px; }
        .hc-term-title { color: white; font-weight: 700; font-size: 0.9rem; margin-bottom: 8px; }
        .hc-term-desc { color: rgba(255,255,255,0.7); font-size: 0.8rem; line-height: 1.6; }

        /* ── CTA ── */
        .hc-cta {
          background: linear-gradient(135deg, var(--gold) 0%, #ffb800 100%);
          padding: 70px 20px; text-align: center;
        }
        .hc-cta h2 { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 900; color: var(--green-dark); margin-bottom: 12px; }
        .hc-cta p { color: var(--green); font-size: 1rem; margin-bottom: 32px; }
        .hc-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .hc-cta-btn-main {
          background: var(--green); color: white;
          padding: 16px 40px; border-radius: 50px;
          font-weight: 700; font-size: 1rem; text-decoration: none;
          transition: all 0.2s; box-shadow: 0 4px 20px rgba(0,77,44,0.3);
        }
        .hc-cta-btn-main:hover { background: var(--green-dark); transform: translateY(-2px); }
        .hc-cta-btn-wa {
          background: #25D366; color: white;
          padding: 16px 40px; border-radius: 50px;
          font-weight: 700; font-size: 1rem; text-decoration: none;
          transition: all 0.2s;
        }
        .hc-cta-btn-wa:hover { background: #1ebe5d; transform: translateY(-2px); }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .hc-about-grid { grid-template-columns: 1fr; gap: 40px; }
          .hc-trips-grid { grid-template-columns: repeat(2, 1fr); }
          .hc-packages-grid { grid-template-columns: repeat(2, 1fr); }
          .hc-pkg-card--popular { transform: none; }
          .hc-terms-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .hc-section { padding: 50px 16px; }
          .hc-highlights-grid { grid-template-columns: 1fr; }
          .hc-trips-grid { grid-template-columns: 1fr 1fr; }
          .hc-packages-grid { grid-template-columns: 1fr; }
          .hc-terms-grid { grid-template-columns: 1fr; }
          .hc-about-stats { grid-template-columns: 1fr 1fr; }
          .hc-cal-cell { min-height: 55px; padding: 5px 3px; }
          .hc-cal-event { font-size: 0.55rem; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hc-hero">
        <div className="hc-hero-badge">✦ Unforgettable Summer Experiences ✦</div>
        <div className="hc-hero-sub">Stanton Academy Presents</div>
        <h1 className="hc-hero-title">
          Holiday
          <span>Camp</span>
        </h1>
        <div className="hc-hero-country">— Malaysia 2026 —</div>
        <p className="hc-hero-tagline">
          Adventure, culture and lifelong memories in the heart of Kuala Lumpur.
          Explore. Experience. Belong.
        </p>
        <div className="hc-hero-btns">
          <Link to="/signup" className="hc-btn-primary">Register Now →</Link>
          <a href="#packages" className="hc-btn-outline">View Packages</a>
        </div>
        <div className="hc-hero-pills">
          <span className="hc-hero-pill">🎒 Ages 8–15+</span>
          <span className="hc-hero-pill">📅 July & August 2026</span>
          <span className="hc-hero-pill">🏙️ Kuala Lumpur</span>
          <span className="hc-hero-pill">🌍 Up to 1 Month</span>
          <span className="hc-hero-pill">🎓 English Immersion</span>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="hc-section">
        <div className="hc-container">
          <div className="hc-about-grid">
            <div className="hc-about-text">
              <div className="hc-section-label">About the Camp</div>
              <h2>The <em>ultimate</em> holiday adventure with learning</h2>
              <p>
                Welcome to the Stanton Academy Holiday Camp in Kuala Lumpur! Designed for kids aged 8 to teenagers 15+, our action-packed program offers up to a full month of non-stop excitement, learning, and cultural discovery.
              </p>
              <p>
                Located right in the heart of KL at Pudu, you're steps away from Bukit Bintang, Berjaya Times Square, Chinatown, and the legendary Alor Street food paradise — with direct LRT, MRT & bus access right at the doorstep.
              </p>
              <div className="hc-about-stats">
                <div className="hc-stat-card">
                  <div className="hc-stat-num">30+</div>
                  <div className="hc-stat-label">Days of adventure</div>
                </div>
                <div className="hc-stat-card">
                  <div className="hc-stat-num">8+</div>
                  <div className="hc-stat-label">Trips & activities</div>
                </div>
                <div className="hc-stat-card">
                  <div className="hc-stat-num">5</div>
                  <div className="hc-stat-label">Package options</div>
                </div>
                <div className="hc-stat-card">
                  <div className="hc-stat-num">15%</div>
                  <div className="hc-stat-label">Early bird discount</div>
                </div>
              </div>
            </div>
            <div className="hc-highlights-grid">
              {HIGHLIGHTS.map((h, i) => (
                <div key={i} className="hc-highlight-card">
                  <div className="hc-highlight-icon">{h.icon}</div>
                  <div>
                    <div className="hc-highlight-title">{h.title}</div>
                    <div className="hc-highlight-desc">{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRIPS ── */}
      <section className="hc-section hc-section--gray">
        <div className="hc-container">
          <div className="hc-section-header">
            <div className="hc-section-label">Trips & Activities</div>
            <h2 className="hc-section-title">Fall in Love with <br/>Trips & Activities</h2>
            <p className="hc-section-desc">Every week is packed with exciting excursions across Malaysia's most iconic destinations.</p>
          </div>
          <div className="hc-trips-grid">
            {TRIPS.map((t, i) => (
              <div key={i} className="hc-trip-card">
                <div className="hc-trip-emoji">{t.emoji}</div>
                <div className="hc-trip-name">{t.name}</div>
                <div className="hc-trip-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ITINERARY ── */}
      <section className="hc-section">
        <div className="hc-container">
          <div className="hc-section-header">
            <div className="hc-section-label">Camp Schedule</div>
            <h2 className="hc-section-title">Holiday Camp Itinerary</h2>
            <p className="hc-section-desc">Two intakes available — July and August 2026. Choose what works best for you!</p>
          </div>
          <div className="hc-tabs">
            <button className={`hc-tab${activeTab === 'july' ? ' hc-tab--active' : ''}`} onClick={() => setActiveTab('july')}>📅 July 2026</button>
            <button className={`hc-tab${activeTab === 'august' ? ' hc-tab--active' : ''}`} onClick={() => setActiveTab('august')}>📅 August 2026</button>
          </div>

          {activeTab === 'july' && (
            <div className="hc-calendar">
              <div className="hc-cal-header">
                {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <div key={d} className="hc-cal-day-name">{d}</div>)}
              </div>
              <div className="hc-cal-grid">
                {/* Row 1 */}
                <div className="hc-cal-cell hc-cal-cell--empty"/>
                <div className="hc-cal-cell hc-cal-cell--empty"/>
                <div className="hc-cal-cell"><div className="hc-cal-num">1</div><div className="hc-cal-event hc-event--arrival">Arrival Day</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">2</div><div className="hc-cal-event hc-event--start">Start Day</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">3</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">4</div><div className="hc-cal-event hc-event--trip">Sunway Lagoon</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">5</div><div className="hc-cal-event hc-event--trip">City Tour & Batu Caves</div></div>
                {/* Row 2 */}
                <div className="hc-cal-cell"><div className="hc-cal-num">6</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">7</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">8</div><div className="hc-cal-event hc-event--night">Movie Night</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">9</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">10</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">11</div><div className="hc-cal-event hc-event--trip">Port Dickson</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">12</div><div className="hc-cal-event hc-event--trip">Port Dickson</div></div>
                {/* Row 3 */}
                <div className="hc-cal-cell"><div className="hc-cal-num">13</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">14</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">15</div><div className="hc-cal-event hc-event--sport">Sport Day</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">16</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">17</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">18</div><div className="hc-cal-event hc-event--trip">Melaka Trip</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">19</div><div className="hc-cal-event hc-event--trip">Melaka Trip</div></div>
                {/* Row 4 */}
                <div className="hc-cal-cell"><div className="hc-cal-num">20</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">21</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">22</div><div className="hc-cal-event hc-event--night">Culture Night</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">23</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">24</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">25</div><div className="hc-cal-event hc-event--trip">Genting Highlands</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">26</div></div>
                {/* Row 5 */}
                <div className="hc-cal-cell"><div className="hc-cal-num">27</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">28</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">29</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">30</div><div className="hc-cal-event hc-event--farewell">Safe Flight Home</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">31</div></div>
                <div className="hc-cal-cell hc-cal-cell--empty"/>
                <div className="hc-cal-cell hc-cal-cell--empty"/>
              </div>
            </div>
          )}

          {activeTab === 'august' && (
            <div className="hc-calendar">
              <div className="hc-cal-header">
                {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <div key={d} className="hc-cal-day-name">{d}</div>)}
              </div>
              <div className="hc-cal-grid">
                <div className="hc-cal-cell hc-cal-cell--empty"/>
                <div className="hc-cal-cell hc-cal-cell--empty"/>
                <div className="hc-cal-cell hc-cal-cell--empty"/>
                <div className="hc-cal-cell"><div className="hc-cal-num">30 Jul</div><div className="hc-cal-event hc-event--arrival">Arrival Day</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">31 Jul</div><div className="hc-cal-event hc-event--start">Start Day</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">1</div><div className="hc-cal-event hc-event--trip">Sunway Lagoon</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">2</div><div className="hc-cal-event hc-event--trip">City Tour & Batu Caves</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">3</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">4</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">5</div><div className="hc-cal-event hc-event--night">Movie Night</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">6</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">7</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">8</div><div className="hc-cal-event hc-event--trip">Port Dickson</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">9</div><div className="hc-cal-event hc-event--trip">Port Dickson</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">10</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">11</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">12</div><div className="hc-cal-event hc-event--sport">Sport Day</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">13</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">14</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">15</div><div className="hc-cal-event hc-event--trip">Melaka Trip</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">16</div><div className="hc-cal-event hc-event--trip">Melaka Trip</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">17</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">18</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">19</div><div className="hc-cal-event hc-event--night">Culture Night</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">20</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">21</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">22</div><div className="hc-cal-event hc-event--trip">Genting Highlands</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">23</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">24</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">25</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">26</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">27</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">28</div><div className="hc-cal-event hc-event--farewell">Safe Flight Home</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">29</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">30</div></div>
                <div className="hc-cal-cell hc-cal-cell--empty"/>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="hc-section hc-section--gray" id="packages">
        <div className="hc-container">
          <div className="hc-section-header">
            <div className="hc-section-label">Pricing</div>
            <h2 className="hc-section-title">Choose Your Package</h2>
            <p className="hc-section-desc">All packages include Intensive General English, study materials, registration fee, T-shirt, SIM card & farewell party.</p>
          </div>
          <div className="hc-packages-grid">
            {PACKAGES.map((pkg, i) => (
              <div key={i} className={`hc-pkg-card${pkg.highlight ? ' hc-pkg-card--popular' : ''}`}>
                {pkg.highlight && <div className="hc-popular-badge">⭐ Most Popular</div>}
                <div className="hc-pkg-dot" style={{ background: pkg.color }}/>
                <div className="hc-pkg-name" style={{ color: pkg.highlight ? '#006B3F' : '#1f2937' }}>{pkg.name}</div>
                <div className="hc-pkg-price-old">{pkg.price}</div>
                <div className="hc-pkg-price-new">{pkg.promo}</div>
                <div className="hc-pkg-deposit">Deposit: {pkg.deposit}</div>
                <hr className="hc-pkg-divider"/>
                <div className="hc-pkg-features">
                  <div className="hc-pkg-feature"><CheckIcon yes={true}/> English Course</div>
                  <div className="hc-pkg-feature"><CheckIcon yes={pkg.features.lunch}/> Lunch</div>
                  <div className="hc-pkg-feature"><CheckIcon yes={pkg.features.airport}/> Airport Transfer</div>
                  <div className="hc-pkg-feature"><CheckIcon yes={true}/> T-Shirt + SIM</div>
                  <div className="hc-pkg-feature"><CheckIcon yes={pkg.features.room}/> {pkg.features.room}</div>
                  <div className="hc-pkg-feature"><CheckIcon yes={pkg.features.tours}/> All Tours</div>
                </div>
                <a href="https://wa.me/601118648860" target="_blank" rel="noopener noreferrer" className="hc-pkg-cta">
                  Register Now
                </a>
              </div>
            ))}
          </div>
          <div className="hc-discount-note">
            🎉 <strong>Up to 15% Early Bird Discount</strong> — First come, first served! Fees include RM 200 Registration & 6% SST.
          </div>
        </div>
      </section>

      {/* ── TERMS ── */}
      <section className="hc-section hc-section--green">
        <div className="hc-container">
          <div className="hc-section-header">
            <div className="hc-section-label" style={{ color: 'rgba(255,199,44,0.8)' }}>Terms & Conditions</div>
            <h2 className="hc-section-title hc-section-title--white">Important Information</h2>
          </div>
          <div className="hc-terms-grid">
            {[
              { num: '01', title: 'Guardians for Under 12', desc: 'Students under 12 must be accompanied by a guardian for all trips and activities.' },
              { num: '02', title: 'Deposit Payment', desc: 'Deposit payment is compulsory and non-refundable after registration.' },
              { num: '03', title: 'Flight Ticket', desc: 'Flight details must be provided at least 2 weeks in advance for airport pickup and accommodation arrangements.' },
              { num: '04', title: 'Consent for Under 18', desc: 'Parental consent is required for all students under 18 years old.' },
              { num: '05', title: 'Airport Transfer', desc: 'Transfer service available during standard operating hours only. Late night or early morning flights may not be eligible.' },
              { num: '06', title: 'Early Bird Discount', desc: 'Up to 15% discount applies on a first come, first served basis. Don\'t miss out!' },
            ].map((t, i) => (
              <div key={i} className="hc-term-card">
                <div className="hc-term-num">{t.num}</div>
                <div className="hc-term-title">{t.title}</div>
                <div className="hc-term-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="hc-cta">
        <div className="hc-container">
          <h2>This Summer, Find Your Adventure! 🌟</h2>
          <p>Limited spots available. Register now to secure your place and early bird discount!</p>
          <div className="hc-cta-btns">
            <Link to="/signup" className="hc-cta-btn-main">Register Now →</Link>
            <a href="https://wa.me/601118648860" target="_blank" rel="noopener noreferrer" className="hc-cta-btn-wa">
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}