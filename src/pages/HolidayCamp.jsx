import React, { useState } from 'react';

// Import local images from assets folder
import cityTourImg from '../assets/City Tour.jpg';
import batuCavesImg from '../assets/Batu caves.jpg';
import sunwayLagoonImg from '../assets/Sunway lagoon.jpg';
import gentingHighlandsImg from '../assets/Genting highlands.jpg';
import portDicksonImg from '../assets/Port Dickson.jpg';
import melakaTripImg from '../assets/Melaka trip.jpg';
import beachBackgroundImg from '../assets/Beach background.jpg';
import summerCampImg from '../assets/landing.jpg'; 

const PACKAGES = [
  {
    name: 'Economy', theme: 'blue', price: '', promo: 'Start from RM2295', deposit: 'RM 950', highlight: false,
    features: [
      { text: 'Intensive English Course', included: true }, 
      { text: 'Lunch Included', included: false },
      { text: 'Airport Transfer', included: false }, 
      { text: 'T-Shirt & SIM Card', included: true },
      { text: 'All Tours Included', included: false }, 
      { text: 'Room Type: Upon Request', included: 'info' }
    ]
  },
  {
    name: 'Bronze', theme: 'orange', price: '', promo: 'Start from RM2295', deposit: 'RM 950', highlight: false,
    features: [
      { text: 'Intensive English Course', included: true }, { text: 'Lunch Included', included: true },
      { text: 'Airport Transfer', included: true }, { text: 'T-Shirt & SIM Card', included: true },
      { text: 'All Tours Included', included: true }, { text: 'Room Type: Small Room', included: 'info' }
    ]
  },
  {
    name: 'Silver', theme: 'gray', price: '', promo: 'Start from RM2295', deposit: 'RM 950', highlight: false,
    features: [
      { text: 'Intensive English Course', included: true }, { text: 'Lunch Included', included: true },
      { text: 'Airport Transfer', included: true }, { text: 'T-Shirt & SIM Card', included: true },
      { text: 'All Tours Included', included: true }, { text: 'Room Type: Small Room', included: 'info' }
    ]
  },
  {
    name: 'Gold', theme: 'gold', price: '', promo: 'Start from RM2295', deposit: 'RM 950', highlight: true, badgeLabel: 'Most Popular',
    features: [
      { text: 'Intensive English Course', included: true }, { text: 'Lunch Included', included: true },
      { text: 'Airport Transfer', included: true }, { text: 'T-Shirt & SIM Card', included: true },
      { text: 'All Tours Included', included: true }, { text: 'Room Type: Middle Room', included: 'info' }
    ]
  },
  {
    name: 'Platinum', theme: 'dark', price: '', promo: 'Start from RM2295', deposit: 'RM 950', highlight: false,
    features: [
      { text: 'Intensive English Course', included: true }, { text: 'Lunch Included', included: true },
      { text: 'Airport Transfer', included: true }, { text: 'T-Shirt & SIM Card', included: true },
      { text: 'All Tours Included', included: true }, { text: 'Room Type: Master Room', included: 'info' }
    ]
  }
];

const GUARDIAN_PACKAGES = [
  {
    name: 'Economy Guardian', theme: 'blue', price: '', promo: 'Start from RM2295', deposit: 'RM 950', highlight: false,
    features: [
      { text: 'Lunch Included', included: false }, 
      { text: 'Airport Transfer', included: true },
      { text: 'T-Shirt & SIM Card', included: true }, 
      { text: 'All Tours Included', included: false },
      { text: 'Accommodation Included', included: false } 
    ]
  },
  {
    name: 'Gold Guardian', theme: 'gold', price: '', promo: 'Start from RM2295', deposit: 'RM 950', highlight: true, badgeLabel: 'Best Value',
    features: [
      { text: 'Lunch Included', included: true }, { text: 'Airport Transfer', included: true },
      { text: 'T-Shirt & SIM Card', included: true }, { text: 'All Tours Included', included: true },
      { text: 'Room Type: Middle Room', included: 'info' }
    ]
  }
];

const TRIPS = [
  { name: 'City Tour', image: cityTourImg, desc: 'Experience the vibrant culture, iconic landmarks and hidden gems.' },
  { name: 'Batu Caves', image: batuCavesImg, desc: 'Explore the majestic caves and immerse in spiritual and cultural heritage.' },
  { name: 'Sunway Lagoon', image: sunwayLagoonImg, desc: 'Fun-filled adventures and excitement for the whole family.' },
  { name: 'Genting Highlands', image: gentingHighlandsImg, desc: 'Breathtaking views, cool weather and world class entertainment.' },
  { name: 'Melaka Trip', image: melakaTripImg, desc: 'Step back in time and discover rich history and heritage.' },
  { name: 'Port Dickson', image: portDicksonImg, desc: 'Relax on the sandy beaches and enjoy the coastal charm.' },
];

const TERMS = [
  { title: 'GUARDIANS FOR STUDENTS UNDER 12', desc: 'Students under 12 must be accompanied a guardian for a trips and activities.' },
  { title: 'DEPOSIT PAYMENT', desc: 'Deposit payments is compulsory and non-refundable after registration.' },
  { title: 'FLIGHT TICKET ACCOMMODATION', desc: 'Flight details must be provided at least 2 weeks in advanced for airport pickup and accommodation arragements.' },
  { title: 'CONSENT FOR STUDENTS UNDER 18', desc: 'Parental consent is required for all students under 18.' },
  { title: 'AIRPORT TRANSFER', desc: 'Airport transfer service are available during standart operating hours only. Flight arriving late at night or early in the morning may not be eligible for airport transfer.' }
];

function FeatureIcon({ status }) {
  if (status === true || status === 'info') {
    return <svg className="icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
  }
  return <svg className="icon-cross" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
}

const ThemeIcon = ({ theme }) => {
  switch(theme) {
    case 'blue': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
    case 'orange': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
    case 'gray': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
    case 'gold': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
    case 'dark': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
    default: return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>;
  }
};

export default function HolidayCampPage() {
  const [activeTab, setActiveTab] = useState('july');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', location: '', package: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // State for tracking which FAQ/Term is currently open
  const [activeTerm, setActiveTerm] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const sheetData = {
      data: [{
          Name: formData.name,
          Nationality: 'N/A', 
          Age: 'N/A', 
          Phone: `'${formData.phone}`,
          Email: formData.email,
          Course: `Summer Camp 2026 (${formData.package || 'No Package Selected'})`, 
          HearAbout: 'Holiday Camp Landing Page Form',
          Message: `Location: ${formData.location}`,
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

  const scrollToForm = (e, pkgName = '') => {
    e.preventDefault();
    if (pkgName) {
      setFormData(prev => ({ ...prev, package: pkgName }));
    }
    document.getElementById('contact-form-section').scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle terms accordion
  const toggleTerm = (index) => {
    setActiveTerm(activeTerm === index ? null : index);
  };

  const waMessage = `Hello! I'm interested in joining the Summer Camp 2026${formData.package ? ` (${formData.package} package)` : ''}.${formData.name ? ` My name is ${formData.name}.` : ''}`;

  return (
    <div className="hc-page">
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
        .hc-hero-modern { position: relative; background-color: #ffffff; display: flex; flex-direction: column; align-items: center; padding: 200px 0 0; text-align: center; z-index: 1; }
        .hc-hero-modern::before { content: ''; position: absolute; top: -10%; left: -10%; width: 50%; height: 60%; background: radial-gradient(circle, rgba(0, 107, 63, 0.08) 0%, transparent 70%); z-index: -1; pointer-events: none; }
        .hc-hero-modern::after { content: ''; position: absolute; top: -5%; right: -15%; width: 60%; height: 70%; background: radial-gradient(circle, rgba(255, 199, 44, 0.12) 0%, transparent 70%); z-index: -1; pointer-events: none; }
        
        .hc-float-icon { position: absolute; z-index: -1; opacity: 0.6; animation: floatAnimation 8s ease-in-out infinite; user-select: none; }
        .hc-float-1 { font-size: 4rem; top: 25%; left: 15%; filter: blur(3px); transform: rotate(-15deg); }
        .hc-float-2 { font-size: 5rem; top: 15%; right: 18%; filter: blur(5px); transform: rotate(20deg); animation-delay: 2s; }
        .hc-float-3 { font-size: 3.5rem; bottom: 35%; left: 8%; filter: blur(4px); transform: rotate(10deg); animation-delay: 4s; }
        .hc-float-4 { font-size: 4.5rem; bottom: 40%; right: 12%; filter: blur(3px); transform: rotate(-10deg); animation-delay: 1s; }

        @keyframes floatAnimation { 0%, 100% { margin-top: 0; } 50% { margin-top: -25px; } }

        .hc-hero-content { padding: 0 20px; max-width: 800px; margin: 0 auto; }
        .hc-hero-title-modern { font-size: clamp(1.5rem, 3.5vw, 2.8rem); font-weight: 800; line-height: 1.3; letter-spacing: -0.01em; margin-bottom: 20px; }
        .hc-hero-desc-modern { font-size: clamp(0.95rem, 1.5vw, 1.1rem); color: var(--gray-600); max-width: 600px; margin: 0 auto 40px; line-height: 1.6; }
        .hc-hero-btn-group { display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; }
        
        .hc-btn-primary-modern { background: var(--green); color: white; padding: 14px 36px; border-radius: 50px; font-weight: 700; font-size: 1rem; text-decoration: none; border: none; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 10px; }
        .hc-btn-primary-modern:hover { background: var(--green-dark); transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0, 107, 63, 0.3); }
        .hc-btn-secondary-modern { background: transparent; color: var(--gray-800); padding: 14px 36px; border-radius: 50px; font-weight: 700; font-size: 1rem; text-decoration: none; border: 2px solid var(--gray-200); cursor: pointer; transition: all 0.3s; }
        .hc-btn-secondary-modern:hover { border-color: var(--gray-800); background: var(--gray-50); }

        /* ── HERO TRIPS OVERLAP ── */
        .hc-hero-trips-wrapper { width: 100%; max-width: 1300px; margin: 60px auto -120px; position: relative; z-index: 10; padding: 0 20px; }
        .hc-trips-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 15px; }
        .hc-trip-card { position: relative; height: 420px; border-radius: 80px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; padding: 40px 20px 30px; text-align: center; color: white; box-shadow: 0 15px 30px rgba(0,0,0,0.12); border: 2px solid rgba(255, 255, 255, 0.4); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hc-trip-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.25); border-color: rgba(255, 255, 255, 0.8); }
        .hc-trip-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; transition: transform 0.5s ease; }
        .hc-trip-card:hover .hc-trip-bg { transform: scale(1.08); }
        .hc-trip-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 100%); z-index: 1; }
        .hc-trip-content { position: relative; z-index: 2; display: flex; flex-direction: column; justify-content: space-between; height: 100%; }
        .hc-trip-name { font-family: 'Dancing Script', cursive; font-size: 2.2rem; font-weight: 700; line-height: 1.1; text-shadow: 1px 1px 4px rgba(0,0,0,0.7); margin: 0; }
        .hc-trip-desc-container { display: flex; flex-direction: column; align-items: center; }
        .hc-trip-desc { font-size: 0.85rem; line-height: 1.5; font-weight: 400; text-shadow: 1px 1px 3px rgba(0,0,0,0.9); margin-bottom: 15px; }
        .hc-trip-divider { width: 35px; height: 2px; background-color: var(--gold); }

        /* ── SECTIONS ── */
        .hc-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .hc-section-header { text-align: center; margin-bottom: 50px; }
        .hc-section-label { font-size: 0.85rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold-dark); margin-bottom: 12px; }
        .hc-section-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; line-height: 1.2; color: var(--gray-800); }

        /* ── ABOUT STANTON CINEMATIC SECTION ── */
        .hc-cinematic-section { background: linear-gradient(to bottom, var(--green-dark) 0%, rgba(0, 107, 63, 0.9) 20%, rgba(0, 107, 63, 0) 60%), url('${beachBackgroundImg}') center/cover no-repeat; padding: 200px 20px 120px; color: white; position: relative; }
        .hc-cinematic-content { max-width: 900px; text-align: left; }
        .hc-about-top-title { font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 800; letter-spacing: 0.1em; margin-bottom: 0; color: white; }
        .hc-about-signature { font-family: 'Dancing Script', cursive; color: var(--gold); font-size: clamp(3rem, 7vw, 5rem); line-height: 1.2; margin-top: 5px; margin-bottom: 30px; text-shadow: 2px 2px 6px rgba(0,0,0,0.3); }
        .hc-about-long-desc { color: rgba(255, 255, 255, 0.95); font-size: 1.05rem; line-height: 1.8; text-shadow: 0 2px 8px rgba(0,0,0,0.8); }
        .hc-about-long-desc p { margin-bottom: 20px; }

        /* ── ITINERARY SECTION ── */
        .hc-itinerary-section { background: var(--gray-50); padding-top: 100px; padding-bottom: 90px; }
        .hc-tabs { display: flex; gap: 8px; margin-bottom: 32px; flex-wrap: wrap; justify-content: center; }
        .hc-tab { padding: 10px 28px; border-radius: 50px; font-weight: 600; font-size: 0.88rem; cursor: pointer; border: 2px solid var(--gray-200); background: white; color: var(--gray-600); transition: all 0.2s; }
        .hc-tab--active { background: var(--green); color: white; border-color: var(--green); }
        .hc-calendar { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .hc-cal-header { background: var(--green); color: white; display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; }
        .hc-cal-day-name { padding: 12px 4px; font-size: 0.78rem; font-weight: 600; }
        .hc-cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); }
        .hc-cal-cell { min-height: 72px; padding: 8px 6px; border: 1px solid var(--gray-100); font-size: 0.78rem; position: relative; }
        .hc-cal-cell--empty { background: var(--gray-50); }
        .hc-cal-num { font-weight: 600; color: var(--gray-600); font-size: 0.8rem; }
        .hc-cal-event { margin-top: 4px; padding: 3px 6px; border-radius: 6px; font-size: 0.65rem; font-weight: 600; line-height: 1.3; text-align: center; }
        .hc-event--arrival   { background: #dbeafe; color: #1e40af; }
        .hc-event--start     { background: #d1fae5; color: #065f46; }
        .hc-event--trip      { background: #fef3c7; color: #92400e; }
        .hc-event--night     { background: #ede9fe; color: #5b21b6; }
        .hc-event--sport     { background: #fee2e2; color: #991b1b; }
        .hc-event--farewell  { background: #ecfccb; color: #3f6212; }

        /* ── PACKAGES GRID ── */
        .hc-packages-section { background: #ffffff; padding-top: 90px; padding-bottom: 90px; }
        .hc-course-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; align-items: stretch; margin-bottom: 40px; padding-top: 25px; }
        .hc-course-card { background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); display: flex; flex-direction: column; border: 1px solid var(--gray-100); transition: transform 0.3s, box-shadow 0.3s; position: relative; }
        .hc-course-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.1); }
        .hc-course-card.highlight { border: 2px solid var(--gold); box-shadow: 0 8px 30px rgba(255,199,44,0.2); }
        .hc-course-header { padding: 30px 20px 10px; text-align: center; display: flex; flex-direction: column; align-items: center; position: relative; border-radius: 16px 16px 0 0; }
        .hc-popular-badge { position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%); background: var(--gold); color: var(--green-dark); font-size: 0.75rem; font-weight: 800; padding: 6px 16px; border-radius: 50px; white-space: nowrap; text-transform: uppercase; z-index: 10; }
        .hc-course-icon { width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; color: white; }
        .hc-course-title { font-size: 1.25rem; font-weight: 800; color: var(--gray-800); text-transform: capitalize; }
        .hc-course-price-block { text-align: center; padding: 0 20px 20px; border-bottom: 1px solid var(--gray-100); }
        .hc-course-old-price { font-size: 0.85rem; color: var(--gray-400); text-decoration: line-through; margin-bottom: 2px; }
        .hc-course-new-price { font-size: 1.6rem; font-weight: 800; color: var(--gray-800); margin-bottom: 8px; }
        .hc-course-deposit { font-size: 0.8rem; color: var(--gray-600); }
        .hc-course-features { padding: 20px; flex: 1; list-style: none; margin: 0; }
        .hc-course-features li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.85rem; color: var(--gray-600); margin-bottom: 12px; line-height: 1.4; }
        .hc-course-features li:last-child { margin-bottom: 0; }
        .hc-course-features .icon-check { color: var(--green); flex-shrink: 0; margin-top: 2px; }
        .hc-course-features .icon-cross { color: #ef4444; flex-shrink: 0; margin-top: 2px; }
        .hc-course-footer { padding: 20px; margin-top: auto; border-radius: 0 0 16px 16px; }
        .hc-course-btn { display: block; width: 100%; padding: 12px; border-radius: 8px; text-align: center; font-weight: 700; font-size: 0.95rem; color: white; text-decoration: none; transition: background 0.3s; border: none; cursor: pointer; }
        
        .theme-blue .hc-course-icon, .theme-blue .hc-course-btn { background-color: #0ea5e9; }
        .theme-blue .hc-course-btn:hover { background-color: #0284c7; }
        .theme-blue .hc-course-new-price { color: #0ea5e9; }
        .theme-orange .hc-course-icon, .theme-orange .hc-course-btn { background-color: #f97316; }
        .theme-orange .hc-course-btn:hover { background-color: #ea580c; }
        .theme-orange .hc-course-new-price { color: #f97316; }
        .theme-gray .hc-course-icon, .theme-gray .hc-course-btn { background-color: #6b7280; }
        .theme-gray .hc-course-btn:hover { background-color: #4b5563; }
        .theme-gray .hc-course-new-price { color: #6b7280; }
        .theme-gold .hc-course-icon, .theme-gold .hc-course-btn { background-color: #eab308; }
        .theme-gold .hc-course-btn:hover { background-color: #ca8a04; }
        .theme-gold .hc-course-new-price { color: #eab308; }
        .theme-dark .hc-course-icon, .theme-dark .hc-course-btn { background-color: #1f2937; }
        .theme-dark .hc-course-btn:hover { background-color: #111827; }
        .theme-dark .hc-course-new-price { color: #1f2937; }

        .hc-discount-note { text-align: center; margin-top: 24px; background: #fef9e7; border: 1px solid #fde68a; border-radius: 12px; padding: 14px; font-size: 0.85rem; color: #92400e; }

        /* ── TERMS SECTION (Accordion FAQ Style) ── */
        .hc-terms-section { background: #f6f5f3; padding: 80px 20px; }
        .hc-terms-container { max-width: 900px; margin: 0 auto; }
        .hc-terms-header { text-align: center; margin-bottom: 40px; }
        .hc-terms-title { font-size: clamp(2rem, 4vw, 2.5rem); font-weight: 800; line-height: 1.2; color: #1a1a1a; text-transform: uppercase; }
        
        .hc-accordion-list { display: flex; flex-direction: column; gap: 12px; }
        .hc-accordion-item {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .hc-accordion-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
        }
        .hc-accordion-title {
          font-weight: 500;
          font-size: 1rem;
          color: #1a1a1a;
          padding-right: 20px;
          line-height: 1.4;
        }
        .hc-accordion-icon {
          color: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }
        .hc-accordion-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-in-out;
        }
        .hc-accordion-item.open .hc-accordion-body {
          max-height: 300px;
        }
        .hc-accordion-content {
          padding: 0 24px 24px;
          color: #6b7280;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        /* ── NEW SUMMER CAMP FORM SECTION ── */
        .hc-contact-section { background: #ffffff; padding: 100px 20px; }
        .hc-camp-card { display: flex; flex-wrap: wrap; align-items: stretch; gap: 40px; text-align: left; background-color: #fff9e6; padding: 40px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.05); max-width: 1000px; margin: 0 auto; }
        .hc-camp-headline { font-size: 2.8rem; font-weight: 800; line-height: 1.2; margin-bottom: 10px; color: var(--green); }
        .hc-camp-headline span { color: var(--gold); }
        .hc-camp-subtitle { font-size: 1rem; margin-bottom: 30px; color: var(--green); font-style: italic; }
        .hc-camp-cta { font-size: 1.2rem; margin-bottom: 20px; font-weight: 700; color: var(--green); }
        
        .hc-camp-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .hc-camp-input { padding: 14px 20px; border: 2px solid #e5e7eb; border-radius: 10px; width: 100%; background-color: #ffffff; font-size: 0.95rem; outline: none; transition: border 0.3s; font-family: inherit; }
        .hc-camp-input:focus { border-color: var(--green); }
        
        .hc-camp-submit { grid-column: 1 / -1; background-color: var(--green); color: var(--gold); padding: 16px; border: none; border-radius: 10px; font-weight: 800; cursor: pointer; font-size: 1.1rem; margin-top: 10px; transition: transform 0.2s, opacity 0.2s; }
        .hc-camp-submit:hover:not(:disabled) { opacity: 0.9; transform: translateY(-2px); }
        .hc-camp-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        
        /* WhatsApp Button Custom Class */
        .hc-wa-btn { grid-column: 1 / -1; display: flex; align-items: center; justify-content: center; gap: 10px; background-color: #25D366; color: white; padding: 16px; border-radius: 10px; font-weight: 800; font-size: 1.1rem; text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; }
        .hc-wa-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(37,211,102,0.2); }

        .hc-camp-img-container { flex: 1 1 400px; display: flex; align-items: center; justify-content: center; border-radius: 16px; overflow: hidden; }
        .hc-camp-img-container img { width: 100%; height: auto; max-height: 100%; object-fit: contain; display: block; border-radius: 16px; }
        
        .hc-success-message { text-align: center; padding: 40px 20px; width: 100%; }
        .hc-success-icon { font-size: 4rem; margin-bottom: 20px; }

        @media (max-width: 1100px) { .hc-trips-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; } .hc-trip-card { height: 380px; } .hc-cinematic-section { padding-top: 180px; } }
        @media (max-width: 900px) { .hc-cinematic-grid { grid-template-columns: 1fr; text-align: center; } .hc-cm-headline { text-align: center; } .hc-cm-visuals { align-items: center; } }
        @media (max-width: 768px) { .hc-camp-card { padding: 25px; gap: 20px; flex-direction: column; } .hc-camp-headline { font-size: 2.1rem; } .hc-camp-form-grid { grid-template-columns: 1fr; } .hc-camp-img-container { flex: 1 1 100%; min-height: auto; max-height: none; } }
        @media (max-width: 600px) { .hc-hero-title-modern { font-size: 2rem; } .hc-hero-trips-wrapper { margin-bottom: -60px; } .hc-trips-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } .hc-trip-card { height: 320px; border-radius: 40px; padding: 25px 10px 20px; } .hc-trip-name { font-size: 1.6rem; } .hc-trip-desc { font-size: 0.7rem; } .hc-cinematic-section { padding-top: 120px; padding-bottom: 60px; } .hc-itinerary-section { padding-top: 80px; } .hc-cal-cell { min-height: 55px; padding: 5px 3px; } .hc-cal-event { font-size: 0.55rem; } }
      `}</style>

      {/* ── HERO SECTION (White/Modern Design) ── */}
      <section className="hc-hero-modern">
        <div className="hc-float-icon hc-float-1">🌍</div>
        <div className="hc-float-icon hc-float-2">✈️</div>
        <div className="hc-float-icon hc-float-3">🎒</div>
        <div className="hc-float-icon hc-float-4">📸</div>
        
        <div className="hc-hero-content">
          <h1 className="hc-hero-title-modern">
            <span style={{ color: 'var(--green)', display: 'inline' }}>Adventure, Culture and Lifelong </span>
            <span style={{ color: 'var(--gold)', display: 'inline' }}>memories in the heart of Malaysia.</span>
          </h1>
          
          <p className="hc-hero-desc-modern">
            Designed for kids aged 8 to teenagers 15+, our action-packed program offers up to a full month of non-stop excitement, learning, and cultural discovery.
          </p>

          <div className="hc-hero-btn-group">
            <button onClick={(e) => scrollToForm(e)} className="hc-btn-primary-modern">
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

      {/* ── ABOUT STANTON CINEMATIC SECTION ── */}
      <section className="hc-cinematic-section">
        <div className="hc-container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hc-cinematic-content">
            <div className="hc-about-header">
              <h2 className="hc-about-top-title">ABOUT STANTON ACADEMY</h2>
              <h1 className="hc-about-signature">Holiday Camp</h1>
            </div>
            <div className="hc-about-long-desc">
              <p>Ready for the ultimate holiday adventure with fun? Welcome to the Stanton Academy Holiday Camp in Kuala Lumpur Malaysia! Designed for kids aged 8 to teenagers 15+, our action-packed program offers up to a full month of non-stop excitement, learning, and cultural discovery in the ultimate city-center playground. This isn't your average indoor experience—it's an interactive journey where participants supercharge their skills through dynamic games, debates, trips and real-world practice.</p>
              <p>Our location at Pudu, Kuala Lumpur is the perfect launchpad for an incredible holiday. Situated right in the heart of Kuala Lumpur, it boasts exceptional transport connectivity with direct access to major LRT, MRT, and bus lines right at our doorstep. This unmatched accessibility means zero-hassle drop-offs for parents, seamless commutes and lightning-fast transit for our thrilling weekly excursions across Kuala Lumpur & Malaysia.</p>
              <p>Best of all, our campus is just a short, exciting walk away from KL's most famous hotspots! Participants are within walking distance of Bukit Bintang, the thrilling shopping district of Berjaya Times Square, the historical streets of Chinatown, and Alor Street—the ultimate world-renowned food heaven & street food paradise of KL.</p>
              <p>Surrounded by infinite energy, culture, and flavor, our campers will build unstoppable teamwork, forge lifelong friendships, and explore the very best of the city. Don't just spend the holidays—own them with Stanton Academy</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ITINERARY ── */}
      <section className="hc-itinerary-section" id="itinerary">
        <div className="hc-container">
          <div className="hc-section-header">
            <div className="hc-section-label">Camp Schedule</div>
            <h2 className="hc-section-title">
              <span style={{ color: 'var(--green)' }}>Holiday Camp</span> <span style={{ color: '#fabc19' }}>Itinerary</span>
            </h2>
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
                <div className="hc-cal-cell hc-cal-cell--empty"/>
                <div className="hc-cal-cell hc-cal-cell--empty"/>
                <div className="hc-cal-cell"><div className="hc-cal-num">1</div><div className="hc-cal-event hc-event--arrival">Arrival Day</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">2</div><div className="hc-cal-event hc-event--start">Start Day</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">3</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">4</div><div className="hc-cal-event hc-event--trip">Sunway Lagoon</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">5</div><div className="hc-cal-event hc-event--trip">City Tour & Batu Caves</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">6</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">7</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">8</div><div className="hc-cal-event hc-event--night">Movie Night</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">9</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">10</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">11</div><div className="hc-cal-event hc-event--trip">Port Dickson</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">12</div><div className="hc-cal-event hc-event--trip">Port Dickson</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">13</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">14</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">15</div><div className="hc-cal-event hc-event--sport">Sport Day</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">16</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">17</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">18</div><div className="hc-cal-event hc-event--trip">Melaka Trip</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">19</div><div className="hc-cal-event hc-event--trip">Melaka Trip</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">20</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">21</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">22</div><div className="hc-cal-event hc-event--night">Culture Night</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">23</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">24</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">25</div><div className="hc-cal-event hc-event--trip">Genting Highlands</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">26</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">27</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">28</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">29</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">30</div><div className="hc-cal-event hc-event--farewell">Flight back home</div></div>
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
                <div className="hc-cal-cell"><div className="hc-cal-num">28</div><div className="hc-cal-event hc-event--farewell">Flight back home</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">29</div></div>
                <div className="hc-cal-cell"><div className="hc-cal-num">30</div></div>
                <div className="hc-cal-cell hc-cal-cell--empty"/>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── PACKAGES GRID ── */}
      <section className="hc-packages-section" id="packages">
        <div className="hc-container">
          <div className="hc-section-header">
            <div className="hc-section-label">Pricing Plans</div>
            <h2 className="hc-section-title">
              <span style={{ color: 'var(--green)' }}>Choose Your</span> <span style={{ color: 'var(--gold)' }}>Package</span>
            </h2>
          </div>
          
          <div className="hc-course-grid">
            {/* Render Student Packages */}
            {PACKAGES.map((pkg, i) => (
              <div key={`student-${i}`} className={`hc-course-card theme-${pkg.theme} ${pkg.highlight ? 'highlight' : ''}`}>
                <div className="hc-course-header">
                  {pkg.highlight && <div className="hc-popular-badge">⭐ {pkg.badgeLabel || 'Most Popular'}</div>}
                  <div className="hc-course-icon"><ThemeIcon theme={pkg.theme} /></div>
                  <h3 className="hc-course-title">{pkg.name}</h3>
                </div>
                <div className="hc-course-price-block">
                  {pkg.price && <div className="hc-course-old-price">{pkg.price}</div>}
                  <div className="hc-course-new-price">{pkg.promo}</div>
                  <div className="hc-course-deposit">Deposit: <strong>{pkg.deposit}</strong></div>
                </div>
                <ul className="hc-course-features">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx}><FeatureIcon status={feature.included} />{feature.text}</li>
                  ))}
                </ul>
                <div className="hc-course-footer">
                  <button onClick={(e) => scrollToForm(e, pkg.name)} className="hc-course-btn">Select Package</button>
                </div>
              </div>
            ))}
            
            {/* Render Guardian Packages */}
            {GUARDIAN_PACKAGES.map((pkg, i) => (
              <div key={`guardian-${i}`} className={`hc-course-card theme-${pkg.theme} ${pkg.highlight ? 'highlight' : ''}`}>
                <div className="hc-course-header">
                  {pkg.highlight && <div className="hc-popular-badge">⭐ {pkg.badgeLabel || 'Best Value'}</div>}
                  <div className="hc-course-icon"><ThemeIcon theme={pkg.theme} /></div>
                  <h3 className="hc-course-title">{pkg.name}</h3>
                </div>
                <div className="hc-course-price-block">
                  {pkg.price && <div className="hc-course-old-price">{pkg.price}</div>}
                  <div className="hc-course-new-price">{pkg.promo}</div>
                  <div className="hc-course-deposit">Deposit: <strong>{pkg.deposit}</strong></div>
                </div>
                <ul className="hc-course-features">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx}><FeatureIcon status={feature.included} />{feature.text}</li>
                  ))}
                </ul>
                <div className="hc-course-footer">
                  <button onClick={(e) => scrollToForm(e, pkg.name)} className="hc-course-btn">Select Package</button>
                </div>
              </div>
            ))}
          </div>

          <div className="hc-discount-note">
            🎉 <strong>Up to 15% Early Bird Discount</strong> — First come, first served! Fees include RM 200 Registration & 6% SST.
          </div>
        </div>
      </section>

      {/* ── TERMS & CONDITIONS (Accordion Style) ── */}
      <section className="hc-terms-section">
        <div className="hc-terms-container">
          <div className="hc-terms-header">
            <h2 className="hc-terms-title">FAQ</h2>
          </div>
          <div className="hc-accordion-list">
            {TERMS.map((term, index) => {
              const isOpen = activeTerm === index;
              return (
                <div key={index} className={`hc-accordion-item ${isOpen ? 'open' : ''}`}>
                  <button className="hc-accordion-header" onClick={() => toggleTerm(index)}>
                    <span className="hc-accordion-title">{term.title}</span>
                    <span className="hc-accordion-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {isOpen ? (
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        ) : (
                          <>
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </>
                        )}
                      </svg>
                    </span>
                  </button>
                  <div className="hc-accordion-body" style={{ maxHeight: isOpen ? '300px' : '0' }}>
                    <div className="hc-accordion-content">
                      <p>{term.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INTEGRATED CONTACT FORM (BEIGE SUMMER CAMP DESIGN) ── */}
      <section className="hc-contact-section" id="contact-form-section">
        <div className="hc-container">
          <div className="hc-camp-card">
            
            {/* Left Side: Form */}
            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {isSubmitted ? (
                <div className="hc-success-message">
                  <div className="hc-success-icon">🎉</div>
                  <h4 style={{ color: 'var(--green)' }}>Application Received!</h4>
                  <p style={{ color: 'var(--gray-600)', marginTop: '10px' }}>
                    Thank you, {formData.name}. Our team will reach out to you via WhatsApp or Email shortly.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="hc-camp-headline">
                    Join The <span>Summer</span><br/><span>Camp</span>
                  </h2>
                  <p className="hc-camp-subtitle">
                    Multicultural And English language center in Kuala Lumpur
                  </p>
                  <h3 className="hc-camp-cta">Apply for this Summer Today!</h3>

                  <form onSubmit={handleSubmit} className="hc-camp-form-grid">
                    
                    {/* Make Name full width to keep the grid balanced! */}
                    <input type="text" placeholder="Your Name*" required className="hc-camp-input" style={{ gridColumn: '1 / -1' }}
                           value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} disabled={isSending} />
                    
                    <input type="email" placeholder="Your Email*" required className="hc-camp-input"
                           value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} disabled={isSending} />
                    
                    <input type="tel" placeholder="Phone Number*" required className="hc-camp-input"
                           value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} disabled={isSending} />
                    
                    <select required className="hc-camp-input" style={{ color: formData.location ? '#1a1a1a' : '#9ca3af' }}
                            value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} disabled={isSending}>
                      <option value="" disabled hidden>Where do you live?*</option>
                      <option value="Kuala Lumpur">Kuala Lumpur</option>
                      <option value="Selangor">Selangor</option>
                      <option value="Other Malaysia">Other (Malaysia)</option>
                      <option value="International">International</option>
                    </select>

                    <select required className="hc-camp-input" style={{ color: formData.package ? '#1a1a1a' : '#9ca3af' }}
                            value={formData.package} onChange={(e) => setFormData({...formData, package: e.target.value})} disabled={isSending}>
                      <option value="" disabled hidden>Select Package*</option>
                      <optgroup label="Student Packages">
                        {PACKAGES.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                      </optgroup>
                      <optgroup label="Guardian Packages">
                        {GUARDIAN_PACKAGES.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                      </optgroup>
                      <option value="Not Sure Yet">Not Sure Yet</option>
                    </select>

                    <button type="submit" className="hc-camp-submit" disabled={isSending}>
                      {isSending ? 'SENDING...' : 'SUBMIT APPLICATION'}
                    </button>

                    {/* NEW: WHATSAPP DIRECT LINK */}
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '10px' }}>
                      <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '10px' }}>Or apply directly via WhatsApp:</p>
                      <a 
                        href={`https://wa.me/601118648860?text=${encodeURIComponent(waMessage)}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hc-wa-btn"
                      >
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        APPLY VIA WHATSAPP
                      </a>
                    </div>

                  </form>
                </>
              )}
            </div>

            {/* Right Side: Image */}
            <div className="hc-camp-img-container">
              <img src={summerCampImg} alt="Summer Camp 2026" />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}