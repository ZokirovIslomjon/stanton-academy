import React, { useState } from 'react';

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
  { name: 'City Tour', emoji: '🏙️', desc: 'Experience the vibrant culture and iconic landmarks' },
  { name: 'Batu Caves', emoji: '⛰️', desc: 'Explore the majestic caves and spiritual heritage' },
  { name: 'Sunway Lagoon', emoji: '🎢', desc: 'Fun-filled adventures for the whole family' },
  { name: 'Genting Highlands', emoji: '🌫️', desc: 'Cool weather and world-class entertainment' },
  { name: 'Port Dickson', emoji: '🏖️', desc: 'Relax on sandy beaches and enjoy coastal charm' },
  { name: 'Melaka Trip', emoji: '🏰', desc: 'Step back in time and discover rich history' },
  { name: 'Sport Night', emoji: '⚽', desc: 'Action-packed games and team building' },
  { name: 'Culture Night', emoji: '🎭', desc: 'Celebrate diverse traditions and arts' },
];

function CheckIcon({ yes }) {
  if (yes === true) return <span style={{ color: '#006B3F', fontSize: '1.1rem' }}>✅</span>;
  if (yes === false) return <span style={{ color: '#ef4444', fontSize: '1.1rem' }}>❌</span>;
  return <span style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: '600' }}>{yes}</span>;
}

export default function HolidayCamp() {
  const [activeTab, setActiveTab] = useState('july');
  
  // Form State
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
        .hc-page { font-family: 'Poppins', sans-serif; color: var(--gray-800); overflow-x: hidden; background: var(--gray-50); }

        /* ── HERO ── */
        .hc-hero {
          min-height: 90vh;
          background: linear-gradient(160deg, var(--green-dark) 0%, var(--green) 50%, #1a5c35 100%);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 120px 20px 80px; position: relative; overflow: hidden;
        }
        .hc-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 70% 30%, rgba(255,199,44,0.15) 0%, transparent 60%),
                      radial-gradient(ellipse at 20% 80%, rgba(255,199,44,0.08) 0%, transparent 50%);
          pointer-events: none;
        }
        .hc-hero-badge {
          display: inline-block; background: rgba(255,199,44,0.15);
          border: 1.5px solid rgba(255,199,44,0.5); color: var(--gold);
          font-size: 0.85rem; font-weight: 700; letter-spacing: 0.15em;
          padding: 8px 20px; border-radius: 50px; text-transform: uppercase; margin-bottom: 24px;
        }
        .hc-hero-title {
          font-size: clamp(3rem, 8vw, 5.5rem); font-weight: 900; color: var(--white);
          line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 20px;
        }
        .hc-hero-title span { color: var(--gold); }
        .hc-hero-tagline {
          font-size: clamp(1.1rem, 2.5vw, 1.4rem); color: rgba(255,255,255,0.9);
          font-weight: 400; max-width: 700px; line-height: 1.6; margin-bottom: 40px;
        }
        .hc-btn-primary {
          background: var(--gold); color: var(--green-dark); padding: 16px 36px;
          border-radius: 50px; font-weight: 700; font-size: 1.05rem; text-decoration: none;
          transition: all 0.3s; border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(255,199,44,0.4);
        }
        .hc-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(255,199,44,0.5); background: #ffd44a; }

        /* ── SECTIONS ── */
        .hc-section { padding: 90px 20px; }
        .hc-container { max-width: 1200px; margin: 0 auto; }
        .hc-section-header { text-align: center; margin-bottom: 60px; }
        .hc-section-label { font-size: 0.85rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--green); margin-bottom: 12px; }
        .hc-section-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; line-height: 1.2; color: var(--gray-800); }

        /* ── TRIPS GRID ── */
        .hc-trips-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
        .hc-trip-card {
          background: white; border-radius: 20px; padding: 30px 20px; text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04); border: 1px solid var(--gray-200); transition: all 0.3s;
        }
        .hc-trip-card:hover { transform: translateY(-5px); border-color: var(--green); box-shadow: 0 10px 30px rgba(0,107,63,0.1); }
        .hc-trip-emoji { font-size: 3rem; margin-bottom: 15px; }
        .hc-trip-name { font-weight: 800; font-size: 1.1rem; color: var(--gray-800); margin-bottom: 8px; }
        .hc-trip-desc { font-size: 0.9rem; color: var(--gray-600); line-height: 1.6; }

        /* ── PACKAGES GRID ── */
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
        .hc-contact-section { background: white; padding: 100px 20px; }
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

        @media (max-width: 900px) {
          .hc-contact-wrapper { grid-template-columns: 1fr; }
          .hc-contact-info, .hc-contact-form-container { padding: 40px 25px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hc-hero">
        <div className="hc-hero-badge">Stanton Academy Summer 2026</div>
        <h1 className="hc-hero-title">Holiday <span>Camp</span></h1>
        <p className="hc-hero-tagline">
          Adventure, culture and lifelong memories in the heart of Malaysia.
        </p>
        <button onClick={scrollToForm} className="hc-btn-primary">Register Now</button>
      </section>

      {/* ── TRIPS ── */}
      <section className="hc-section">
        <div className="hc-container">
          <div className="hc-section-header">
            <div className="hc-section-label">Excursions</div>
            <h2 className="hc-section-title">Trips & Activities</h2>
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

      {/* ── PACKAGES ── */}
      <section className="hc-section" style={{ background: '#ffffff' }}>
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
              <p>Secure your spot in the Stanton Academy Holiday Camp. Fill out the form, and our admissions team will contact you with the next steps.</p>
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