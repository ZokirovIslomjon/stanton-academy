import React, { useState } from 'react';
import Header from '../components/Header';

// Import local images from assets folder
import cityTourImg from '../assets/City Tour.jpg';
import batuCavesImg from '../assets/Batu caves.jpg';
import sunwayLagoonImg from '../assets/Sunway lagoon.jpg';
import gentingHighlandsImg from '../assets/Genting highlands.jpg';
import portDicksonImg from '../assets/Port Dickson.jpg';
import melakaTripImg from '../assets/Melaka trip.jpg';

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
    color: '#1f2937',
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
  { name: 'City Tour', image: cityTourImg, desc: 'Experience the vibrant culture, iconic landmarks and hidden gems.' },
  { name: 'Batu Caves', image: batuCavesImg, desc: 'Explore the majestic caves and immerse in spiritual and cultural heritage.' },
  { name: 'Sunway Lagoon', image: sunwayLagoonImg, desc: 'Fun-filled adventures and excitement for the whole family.' },
  { name: 'Genting Highlands', image: gentingHighlandsImg, desc: 'Breathtaking views, cool weather and world class entertainment.' },
  { name: 'Melaka Trip', image: melakaTripImg, desc: 'Step back in time and discover rich history and heritage.' },
  { name: 'Port Dickson', image: portDicksonImg, desc: 'Relax on the sandy beaches and enjoy the coastal charm.' },
];

function CheckIcon({ yes }) {
  if (yes === true) return <span style={{ color: '#006B3F', fontSize: '1.1rem' }}>✅</span>;
  if (yes === false) return <span style={{ color: '#ef4444', fontSize: '1.1rem' }}>❌</span>;
  return <span style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: '600' }}>{yes}</span>;
}

export default function HolidayCamp() {
  const [activeTab, setActiveTab] = useState('july');
  const [formData, setFormData] = useState({ fullName: '', phone: '', email: '', package: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const sheetData = {
      data: [{
          Name: formData.fullName,
          Phone: formData.phone,
          Email: formData.email,
          Course: `Holiday Camp - ${formData.package || 'Undecided'}`,
          HearAbout: 'Holiday Camp Landing Page Form',
          Date: new Date().toLocaleString()
      }]
    };

    try {
      const response = await fetch('https://sheetdb.io/api/v1/k5ohu0497ek0x', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetData)
      });

      if (response.ok) {
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'ads_conversion_Submit_lead_form_1', { 'event_category': 'Lead Form', 'event_label': 'Holiday Camp' });
        }
        setIsSubmitted(true);
      }
    } catch (error) {
      alert('Failed to send application. Please contact us on WhatsApp.');
    } finally {
      setIsSending(false);
    }
  };

  const scrollToForm = (e) => {
    e.preventDefault();
    document.getElementById('contact-form-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hc-page">
      <Header />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Dancing+Script:wght@700&display=swap');

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
        .hc-page { font-family: 'Poppins', sans-serif; color: var(--gray-800); overflow-x: hidden; background: var(--white); }

        /* ── HERO SECTION (White/Modern Design) ── */
        .hc-hero-modern {
          position: relative;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 200px 0 0;
          text-align: center;
          z-index: 1;
        }

        /* Soft Background Gradients */
        .hc-hero-modern::before {
          content: '';
          position: absolute; top: -10%; left: -10%; width: 50%; height: 60%;
          background: radial-gradient(circle, rgba(0, 107, 63, 0.08) 0%, transparent 70%);
          z-index: -1; pointer-events: none;
        }
        .hc-hero-modern::after {
          content: '';
          position: absolute; top: -5%; right: -15%; width: 60%; height: 70%;
          background: radial-gradient(circle, rgba(255, 199, 44, 0.12) 0%, transparent 70%);
          z-index: -1; pointer-events: none;
        }

        /* Floating Blurred Elements */
        .hc-float-icon {
          position: absolute;
          z-index: -1;
          opacity: 0.6;
          animation: floatAnimation 8s ease-in-out infinite;
          user-select: none;
        }
        .hc-float-1 { font-size: 4rem; top: 25%; left: 15%; filter: blur(3px); transform: rotate(-15deg); }
        .hc-float-2 { font-size: 5rem; top: 15%; right: 18%; filter: blur(5px); transform: rotate(20deg); animation-delay: 2s; }
        .hc-float-3 { font-size: 3.5rem; bottom: 35%; left: 8%; filter: blur(4px); transform: rotate(10deg); animation-delay: 4s; }
        .hc-float-4 { font-size: 4.5rem; bottom: 40%; right: 12%; filter: blur(3px); transform: rotate(-10deg); animation-delay: 1s; }

        @keyframes floatAnimation {
          0%, 100% { margin-top: 0; }
          50% { margin-top: -25px; }
        }

        .hc-hero-content {
          padding: 0 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .hc-hero-title-modern {
          font-size: clamp(1.5rem, 3.5vw, 2.8rem);
          font-weight: 800;
          line-height: 1.3; letter-spacing: -0.01em;
          margin-bottom: 20px;
        }

        .hc-hero-desc-modern {
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          color: var(--gray-600); max-width: 600px;
          margin: 0 auto 40px; line-height: 1.6;
        }

        .hc-hero-btn-group {
          display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;
        }
        
        .hc-btn-primary-modern {
          background: var(--green); color: white;
          padding: 14px 36px; border-radius: 50px; font-weight: 700; font-size: 1rem;
          text-decoration: none; border: none; cursor: pointer;
          transition: all 0.3s; display: flex; align-items: center; gap: 10px;
        }
        .hc-btn-primary-modern:hover {
          background: var(--green-dark); transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 107, 63, 0.3);
        }

        .hc-btn-secondary-modern {
          background: transparent; color: var(--gray-800);
          padding: 14px 36px; border-radius: 50px; font-weight: 700; font-size: 1rem;
          text-decoration: none; border: 2px solid var(--gray-200); cursor: pointer; transition: all 0.3s;
        }
        .hc-btn-secondary-modern:hover {
          border-color: var(--gray-800); background: var(--gray-50);
        }

        /* ── HERO TRIPS OVERLAP ── */
        .hc-hero-trips-wrapper {
          width: 100%;
          max-width: 1300px;
          margin: 60px auto -120px; /* Pulls it down to overlap the next section */
          position: relative;
          z-index: 10;
          padding: 0 20px;
        }

        .hc-trips-grid {
          display: grid; 
          grid-template-columns: repeat(6, 1fr);
          gap: 15px;
        }
        .hc-trip-card {
          position: relative;
          height: 420px;
          border-radius: 80px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 40px 20px 30px;
          text-align: center;
          color: white;
          box-shadow: 0 15px 30px rgba(0,0,0,0.12);
          border: 2px solid rgba(255, 255, 255, 0.4);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hc-trip-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
          border-color: rgba(255, 255, 255, 0.8);
        }
        .hc-trip-bg {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          object-fit: cover;
          z-index: 0;
          transition: transform 0.5s ease;
        }
        .hc-trip-card:hover .hc-trip-bg {
          transform: scale(1.08);
        }
        .hc-trip-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 100%);
          z-index: 1;
        }
        .hc-trip-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }
        .hc-trip-name {
          font-family: 'Dancing Script', cursive;
          font-size: 2.2rem;
          font-weight: 700;
          line-height: 1.1;
          text-shadow: 1px 1px 4px rgba(0,0,0,0.7);
          margin: 0;
        }
        .hc-trip-desc-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .hc-trip-desc {
          font-size: 0.85rem;
          line-height: 1.5;
          font-weight: 400;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.9);
          margin-bottom: 15px;
        }
        .hc-trip-divider {
          width: 35px;
          height: 2px;
          background-color: var(--gold);
        }

        /* ── SECTIONS ── */
        .hc-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .hc-section-header { text-align: center; margin-bottom: 50px; }
        .hc-section-label { font-size: 0.85rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold-dark); margin-bottom: 12px; }
        .hc-section-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; line-height: 1.2; color: var(--gray-800); }

        /* ── ITINERARY SECTION ── */
        .hc-itinerary-section {
          background: var(--gray-50);
          padding-top: 200px; /* Space for the overlapping trip cards */
          padding-bottom: 90px;
        }
        .hc-tabs { display: flex; gap: 8px; margin-bottom: 32px; flex-wrap: wrap; justify-content: center; }
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
          line-height: 1.3; text-align: center;
        }
        .hc-event--arrival   { background: #dbeafe; color: #1e40af; }
        .hc-event--start     { background: #d1fae5; color: #065f46; }
        .hc-event--trip      { background: #fef3c7; color: #92400e; }
        .hc-event--night     { background: #ede9fe; color: #5b21b6; }
        .hc-event--sport     { background: #fee2e2; color: #991b1b; }
        .hc-event--farewell  { background: #ecfccb; color: #3f6212; }

        /* ── PACKAGES GRID ── */
        .hc-packages-section {
          background: #ffffff;
          padding-top: 90px;
          padding-bottom: 90px;
        }
        .hc-packages-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; align-items: start; }
        .hc-pkg-card {
          background: white; border-radius: 24px; padding: 30px 20px; text-align: center;
          border: 2px solid var(--gray-200); position: relative; transition: all 0.3s;
        }
        .hc-pkg-card--popular { border-color: var(--gold); box-shadow: 0 12px 40px rgba(255,199,44,0.2); transform: translateY(-10px); }
        .hc-popular-badge {
          position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
          background: var(--gold); color: var(--green-dark); font-size: 0.75rem; font-weight: 800;
          padding: 6px 16px; border-radius: 50px; white-space: nowrap; text-transform: uppercase;
        }
        .hc-pkg-name { font-weight: 800; font-size: 1.3rem; margin-bottom: 15px; text-transform: uppercase; }
        .hc-pkg-price-old { font-size: 0.9rem; color: var(--gray-400); text-decoration: line-through; }
        .hc-pkg-price-new { font-size: 1.8rem; font-weight: 900; color: var(--green); margin: 5px 0; }
        .hc-pkg-deposit { font-size: 0.85rem; color: var(--gray-600); margin-bottom: 20px; background: var(--gray-50); padding: 5px; border-radius: 8px; }
        .hc-pkg-divider { border: none; border-top: 1px solid var(--gray-200); margin: 20px 0; }
        .hc-pkg-feature { display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; color: var(--gray-600); padding: 8px 0; border-bottom: 1px dashed var(--gray-100); }
        .hc-pkg-cta {
          display: block; margin-top: 25px; background: var(--gray-100); color: var(--gray-800);
          padding: 14px; border-radius: 50px; font-weight: 700; font-size: 0.9rem; text-decoration: none; transition: all 0.3s;
        }
        .hc-pkg-card:hover .hc-pkg-cta { background: var(--green); color: white; }
        .hc-pkg-card--popular .hc-pkg-cta { background: var(--gold); color: var(--green-dark); }
        .hc-pkg-card--popular .hc-pkg-cta:hover { background: #ffd44a; }

        /* ── CONTACT FORM SECTION ── */
        .hc-contact-section { background: var(--gray-50); padding: 100px 20px; }
        .hc-contact-wrapper {
          max-width: 1000px; margin: 0 auto; background: var(--white); border-radius: 30px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.08); display: grid; grid-template-columns: 1fr 1fr; overflow: hidden;
        }
        .hc-contact-info { background: var(--green); color: white; padding: 50px 40px; display: flex; flex-direction: column; justify-content: center; }
        .hc-contact-info h3 { font-size: 2.2rem; font-weight: 800; margin-bottom: 20px; color: var(--gold); }
        .hc-contact-info p { font-size: 1.05rem; opacity: 0.9; line-height: 1.6; margin-bottom: 30px; }
        .hc-contact-form-container { padding: 50px 40px; }
        .hc-form-group { margin-bottom: 20px; }
        .hc-form-group label { display: block; font-size: 0.9rem; font-weight: 600; color: var(--gray-800); margin-bottom: 8px; }
        .hc-form-control {
          width: 100%; padding: 14px 16px; border: 2px solid var(--gray-200); border-radius: 12px;
          font-size: 1rem; color: var(--gray-800); background: var(--gray-50); outline: none; transition: all 0.3s; font-family: inherit;
        }
        .hc-form-control:focus { border-color: var(--green); background: white; box-shadow: 0 0 0 4px rgba(0, 107, 63, 0.1); }
        .hc-submit-btn {
          width: 100%; padding: 16px; background: var(--gold); color: var(--green-dark); border: none;
          border-radius: 12px; font-size: 1.1rem; font-weight: 800; cursor: pointer; transition: all 0.3s; margin-top: 10px;
        }
        .hc-submit-btn:hover:not(:disabled) { background: #ffd44a; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(255, 199, 44, 0.3); }
        .hc-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .hc-success-message { text-align: center; padding: 40px 20px; }
        .hc-success-icon { font-size: 4rem; margin-bottom: 20px; }
        .hc-success-message h4 { font-size: 1.8rem; font-weight: 800; color: var(--green); margin-bottom: 10px; }

        @media (max-width: 1100px) {
          .hc-trips-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
          .hc-trip-card { height: 380px; }
          .hc-itinerary-section { padding-top: 150px; }
        }
        @media (max-width: 900px) {
          .hc-contact-wrapper { grid-template-columns: 1fr; }
          .hc-contact-info, .hc-contact-form-container { padding: 40px 25px; }
        }
        @media (max-width: 600px) {
          .hc-hero-trips-wrapper { margin-bottom: -60px; }
          .hc-trips-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .hc-trip-card { height: 320px; border-radius: 40px; padding: 25px 10px 20px; }
          .hc-trip-name { font-size: 1.6rem; }
          .hc-trip-desc { font-size: 0.7rem; }
          .hc-itinerary-section { padding-top: 100px; }
          .hc-cal-cell { min-height: 55px; padding: 5px 3px; }
          .hc-cal-event { font-size: 0.55rem; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hc-hero-modern">
        <div className="hc-float-icon hc-float-1">🌍</div>
        <div className="hc-float-icon hc-float-2">✈️</div>
        <div className="hc-float-icon hc-float-3">🎒</div>
        <div className="hc-float-icon hc-float-4">📸</div>
        
        <div className="hc-hero-content">
          <h1 className="hc-hero-title-modern">
            <span style={{ color: 'var(--green)' }}>Adventure, Culture and Lifelong memories in the heart of </span>
            <span style={{ color: '#fabc19' }}>Malaysia.</span>
          </h1>
          
          <p className="hc-hero-desc-modern">
            Designed for kids aged 8 to teenagers 15+, our action-packed program offers up to a full month of non-stop excitement, learning, and cultural discovery.
          </p>

          <div className="hc-hero-btn-group">
            <button onClick={scrollToForm} className="hc-btn-primary-modern">
              Choose Package <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <a href="#packages" className="hc-btn-secondary-modern">View Pricing</a>
          </div>
        </div>

        {/* ── TRIPS & ACTIVITIES (Overlapping section) ── */}
        <div className="hc-hero-trips-wrapper">
          <div className="hc-trips-grid">
            {TRIPS.map((t, i) => (
              <div key={i} className="hc-trip-card">
                <img src={t.image} alt={t.name} className="hc-trip-bg" />
                <div className="hc-trip-overlay"></div>
                
                <div className="hc-trip-content">
                  <h3 className="hc-trip-name">{t.name}</h3>
                  <div className="hc-trip-desc-container">
                    <p className="hc-trip-desc">{t.desc}</p>
                    <div className="hc-trip-divider"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ITINERARY (Reverted to manual hardcoded version) ── */}
      <section className="hc-itinerary-section" id="itinerary">
        <div className="hc-container">
          <div className="hc-section-header">
            <div className="hc-section-label">Camp Schedule</div>
            <h2 className="hc-section-title">
              <span style={{ color: 'var(--green)' }}>Holiday Camp</span> <span style={{ color: '#fabc19' }}>Itinerary</span>
            </h2>
            {/* The sub-description text has been completely removed here */}
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
      <section className="hc-packages-section" id="packages">
        <div className="hc-container">
          <div className="hc-section-header">
            <div className="hc-section-label">Pricing Plans</div>
            <h2 className="hc-section-title">Choose Your Package</h2>
          </div>
          <div className="hc-packages-grid">
            {PACKAGES.map((pkg, i) => (
              <div key={i} className={`hc-pkg-card${pkg.highlight ? ' hc-pkg-card--popular' : ''}`}>
                {pkg.highlight && <div className="hc-popular-badge">⭐ Most Popular</div>}
                <div className="hc-pkg-name" style={{ color: pkg.highlight ? 'var(--green)' : 'inherit' }}>{pkg.name}</div>
                <div className="hc-pkg-price-old">{pkg.price}</div>
                <div className="hc-pkg-price-new">{pkg.promo}</div>
                <div className="hc-pkg-deposit">Deposit: <strong>{pkg.deposit}</strong></div>
                <hr className="hc-pkg-divider"/>
                <div>
                  <div className="hc-pkg-feature"><span>Intensive English</span> <CheckIcon yes={pkg.features.course}/></div>
                  <div className="hc-pkg-feature"><span>Lunch</span> <CheckIcon yes={pkg.features.lunch}/></div>
                  <div className="hc-pkg-feature"><span>Airport Transfer</span> <CheckIcon yes={pkg.features.airport}/></div>
                  <div className="hc-pkg-feature"><span>T-Shirt & SIM</span> <CheckIcon yes={pkg.features.sim}/></div>
                  <div className="hc-pkg-feature"><span>All Tours</span> <CheckIcon yes={pkg.features.tours}/></div>
                  <div className="hc-pkg-feature"><span>Room Type</span> <CheckIcon yes={pkg.features.room}/></div>
                </div>
                <button onClick={scrollToForm} className="hc-pkg-cta">Select Package</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTEGRATED CONTACT FORM ── */}
      <section className="hc-contact-section" id="contact-form-section">
        <div className="hc-container">
          <div className="hc-contact-wrapper">
            <div className="hc-contact-info">
              <h3>Join the Adventure</h3>
              <p>Secure your spot in the Stanton Academy program. Fill out the form, and our admissions team will contact you with the next steps.</p>
              <ul style={{ listStyle: 'none', marginTop: '20px', lineHeight: '2.5' }}>
                <li>✅ Up to 15% Early Bird Discounts</li>
                <li>✅ Direct access to KL City Center</li>
                <li>✅ Expert Native Teachers</li>
              </ul>
            </div>
            
            <div className="hc-contact-form-container">
              {isSubmitted ? (
                <div className="hc-success-message">
                  <div className="hc-success-icon">🎉</div>
                  <h4>Application Received!</h4>
                  <p style={{ color: 'var(--gray-600)', marginTop: '10px' }}>
                    Thank you, {formData.fullName}. Our team will reach out to you via WhatsApp or Email shortly to finalize your registration.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="hc-form-group">
                    <label>Full Name</label>
                    <input type="text" required className="hc-form-control" placeholder="Enter your name"
                           value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} disabled={isSending} />
                  </div>
                  <div className="hc-form-group">
                    <label>Phone Number (WhatsApp)</label>
                    <input type="tel" required className="hc-form-control" placeholder="+60 12 345 6789"
                           value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} disabled={isSending} />
                  </div>
                  <div className="hc-form-group">
                    <label>Email Address</label>
                    <input type="email" required className="hc-form-control" placeholder="you@example.com"
                           value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} disabled={isSending} />
                  </div>
                  <div className="hc-form-group">
                    <label>Interested Package</label>
                    <select required className="hc-form-control" value={formData.package} onChange={(e) => setFormData({...formData, package: e.target.value})} disabled={isSending}>
                      <option value="" disabled hidden>Select a package</option>
                      {PACKAGES.map(pkg => <option key={pkg.name} value={pkg.name}>{pkg.name} Package</option>)}
                      <option value="Undecided">I'm not sure yet</option>
                    </select>
                  </div>
                  <button type="submit" className="hc-submit-btn" disabled={isSending}>
                    {isSending ? 'Sending...' : 'Register Now'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}