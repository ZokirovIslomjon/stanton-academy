import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import summerCampImg from '../assets/landing.jpg'; 

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Added package to form data
  const [campForm, setCampForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    package: ''
  });

  const handleCampSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const sheetData = {
      data: [
        {
          Name: campForm.name,
          Nationality: 'N/A', 
          Age: 'N/A', 
          Phone: `'${campForm.phone}`, 
          Email: campForm.email,
          Course: `Summer Camp 2026 (${campForm.package || 'No Package Selected'})`, // Save selected package
          HearAbout: 'N/A',
          Message: `Location: ${campForm.location}`,
          Date: new Date().toLocaleString()
        }
      ]
    };

    try {
      const response = await fetch('https://sheetdb.io/api/v1/k5ohu0497ek0x', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetData)
      });

      if (response.ok) {
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'ads_conversion_Submit_lead_form_1', {
             'event_category': 'Lead Form', 'event_label': 'Summer Camp 2026' 
          });
        }
        setIsSubmitted(true);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      alert('Failed to send application. Please try again or contact us directly on WhatsApp.');
    } finally {
      setIsSending(false);
    }
  };

  const handleResetCampForm = () => {
    setCampForm({ name: '', email: '', phone: '', location: '', package: '' });
    setIsSubmitted(false);
  };

  const slides = [
    {
      id: 1, type: 'standard',
      headline: "We don't just teach English,", highlight: "we change people's lives!",
      subtext: "Master the English language with Stanton Academy's world-class curriculum.",
      btnText: "Sign up for the first lesson ✨",
      duration: 5000 
    },
    {
      id: 2, type: 'form',
      headlineStart: "Join The ", headlineEnd: "Holiday Camp",
      subtext: "Explore Malaysia with English & Fun",
      callToAction: "Apply for this Holiday Camp Today!",
      duration: 60000 
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, slides[currentSlide].duration); 
    
    return () => clearTimeout(timer);
  }, [currentSlide, slides.length]); 

  return (
    <section className="hero new-hero-style hero-section-wrapper">
      
      <style>{`
          .hero-section-wrapper { display: flex; align-items: center; position: relative; padding: 140px 0 80px; min-height: 750px; }
          .camp-card { display: flex; flex-wrap: wrap; align-items: stretch; gap: 40px; text-align: left; background-color: #fff9e6; padding: 40px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
          .camp-headline { font-size: 2.8rem; font-weight: 800; line-height: 1.2; margin-bottom: 10px; }
          .camp-subtitle { font-size: 1.1rem; margin-bottom: 30px; }
          .camp-cta { font-size: 1.3rem; margin-bottom: 20px; font-weight: 700; }
          .camp-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
          .camp-img-container { flex: 1 1 400px; display: flex; border-radius: 16px; overflow: hidden; min-height: 350px; }
          .standard-slide-wrapper { display: flex; flex-direction: column; justify-content: center; width: 100%; }
          .fade-in-up { animation: fadeInUp 0.4s ease-out; }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

          @media (max-width: 768px) {
            .hero-section-wrapper { min-height: auto; padding: 120px 0 40px; }
            .camp-card { padding: 25px; gap: 20px; }
            .camp-headline { font-size: 2.1rem; }
            .camp-subtitle { font-size: 0.95rem; margin-bottom: 20px; }
            .camp-cta { font-size: 1.1rem; margin-bottom: 15px; }
            .camp-form-grid { grid-template-columns: 1fr; }
            .camp-img-container { flex: 1 1 100%; min-height: 220px; max-height: 280px; }
          }
      `}</style>

      <div className="hero-background-blobs"></div>

      <div className="container" style={{ position: 'relative', width: '100%' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              style={{
                position: index === currentSlide ? 'relative' : 'absolute',
                top: 0, left: 0, width: '100%',
                opacity: index === currentSlide ? 1 : 0,
                visibility: index === currentSlide ? 'visible' : 'hidden',
                transition: 'opacity 0.8s ease-in-out, visibility 0.8s',
                zIndex: index === currentSlide ? 10 : 1,
              }}
            >
              {slide.type === 'form' ? (
                <div className="camp-card">
                  <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {isSubmitted ? (
                      <div className="fade-in-up" style={{ textAlign: 'center', padding: '20px' }}>
                        <div style={{ width: '80px', height: '80px', backgroundColor: '#e6f4ea', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 0 0 10px rgba(0, 107, 63, 0.05)' }}>
                          <svg fill="none" viewBox="0 0 24 24" stroke="#006B3F" strokeWidth={3} style={{ width: '40px', height: '40px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h2 style={{ color: '#006B3F', fontSize: '2rem', fontWeight: '800', margin: '15px 0' }}>Application Received!</h2>
                        <p style={{ color: '#374151', fontSize: '1.1rem', marginBottom: '30px' }}>Thank you, <strong>{campForm.name}</strong>. Your Summer Camp application has been successfully submitted!</p>
                        <button onClick={handleResetCampForm} style={{ backgroundColor: '#006B3F', color: '#FFC72C', padding: '14px 40px', border: 'none', borderRadius: '50px', fontWeight: '800', cursor: 'pointer', fontSize: '1.1rem' }}>Done</button>
                      </div>
                    ) : (
                      <div className="fade-in-up">
                        <h1 className="camp-headline">
                          <span style={{ color: '#006B3F' }}>{slide.headlineStart}</span>
                          <span style={{ color: '#FFC72C' }}>{slide.headlineEnd}</span>
                        </h1>
                        <p className="camp-subtitle" style={{ color: '#006B3F', fontStyle: 'italic' }}>{slide.subtext}</p>
                        <h3 className="camp-cta" style={{ color: '#006B3F' }}>{slide.callToAction}</h3>

                        <form onSubmit={handleCampSubmit} className="camp-form-grid">
                          <input type="text" placeholder="Your Name*" required style={{ gridColumn: '1 / -1', padding: '14px 20px', border: '2px solid #e5e7eb', borderRadius: '10px', width: '100%', fontSize: '0.95rem', outline: 'none' }}
                            value={campForm.name} onChange={(e) => setCampForm({...campForm, name: e.target.value})} disabled={isSending} />
                          
                          <input type="email" placeholder="Your Email*" required style={{ padding: '14px 20px', border: '2px solid #e5e7eb', borderRadius: '10px', width: '100%', fontSize: '0.95rem', outline: 'none' }}
                            value={campForm.email} onChange={(e) => setCampForm({...campForm, email: e.target.value})} disabled={isSending} />
                          
                          <input type="tel" placeholder="Phone Number*" required style={{ padding: '14px 20px', border: '2px solid #e5e7eb', borderRadius: '10px', width: '100%', fontSize: '0.95rem', outline: 'none' }}
                            value={campForm.phone} onChange={(e) => setCampForm({...campForm, phone: e.target.value})} disabled={isSending} />
                          
                          <select required style={{ padding: '14px 20px', border: '2px solid #e5e7eb', borderRadius: '10px', width: '100%', fontSize: '0.95rem', outline: 'none', color: campForm.location ? '#1a1a1a' : '#9ca3af' }}
                            value={campForm.location} onChange={(e) => setCampForm({...campForm, location: e.target.value})} disabled={isSending}>
                            <option value="" disabled>Where do you live?*</option>
                            <option value="Kuala Lumpur">Kuala Lumpur</option>
                            <option value="Selangor">Selangor</option>
                            <option value="Other Malaysia">Other (Malaysia)</option>
                            <option value="International">International</option>
                          </select>

                          {/* NEW PACKAGE DROPDOWN */}
                          <select required style={{ padding: '14px 20px', border: '2px solid #e5e7eb', borderRadius: '10px', width: '100%', fontSize: '0.95rem', outline: 'none', color: campForm.package ? '#1a1a1a' : '#9ca3af', backgroundColor: 'white' }}
                            value={campForm.package} onChange={(e) => setCampForm({...campForm, package: e.target.value})} disabled={isSending}>
                            <option value="" disabled hidden>Select Package*</option>
                            <optgroup label="Student Packages">
                              <option value="Economy">Economy</option>
                              <option value="Bronze">Bronze</option>
                              <option value="Silver">Silver</option>
                              <option value="Gold">Gold</option>
                              <option value="Platinum">Platinum</option>
                            </optgroup>
                            <optgroup label="Guardian Packages">
                              <option value="Economy Guardian">Economy Guardian</option>
                              <option value="Gold Guardian">Gold Guardian</option>
                            </optgroup>
                            <option value="Not Sure Yet">Not Sure Yet</option>
                          </select>

                          <button type="submit" disabled={isSending} style={{ gridColumn: '1 / -1', backgroundColor: '#006B3F', color: '#FFC72C', padding: '16px', border: 'none', borderRadius: '10px', fontWeight: '800', cursor: isSending ? 'not-allowed' : 'pointer', fontSize: '1.1rem', marginTop: '10px', opacity: isSending ? '0.7' : '1' }}>
                            {isSending ? 'SENDING...' : 'SUBMIT APPLICATION'}
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                  <div className="camp-img-container">
                    <img src={summerCampImg} alt="Summer Camp Poster" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                  </div>
                </div>
              ) : (
                <div className="standard-slide-wrapper">
                  <div className="hero-text-centered">
                    <h1>{slide.headline} <span style={{ color: '#FFC72C' }}>{slide.highlight}</span></h1>
                    <p>{slide.subtext}</p>
                    <div className="cta-buttons centered-btns">
                      <Link to="/signup" className="btn btn-primary">{slide.btnText}</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '40px', position: 'relative', zIndex: 20 }}>
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentSlide(idx)}
              style={{ width: '12px', height: '12px', borderRadius: '50%', border: 'none', backgroundColor: idx === currentSlide ? '#006B3F' : '#d1d5db', cursor: 'pointer', transition: 'all 0.3s ease', transform: idx === currentSlide ? 'scale(1.3)' : 'scale(1)' }} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;