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
          Course: `Summer Camp 2026 (${campForm.package || 'No Package Selected'})`, 
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

  // Generate WhatsApp Message dynamically
  const waMessage = `Hello! I'm interested in joining the Summer Camp 2026${campForm.package ? ` (${campForm.package} package)` : ''}.${campForm.name ? ` My name is ${campForm.name}.` : ''}`;

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
          
          /* FIXED: Centered contents and flexible height to prevent cropping */
          .camp-img-container { flex: 1 1 400px; display: flex; align-items: center; justify-content: center; border-radius: 16px; overflow: hidden; min-height: 350px; }
          
          .standard-slide-wrapper { display: flex; flex-direction: column; justify-content: center; width: 100%; }
          .fade-in-up { animation: fadeInUp 0.4s ease-out; }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

          /* WhatsApp Button Custom Class */
          .hero-wa-btn { grid-column: 1 / -1; display: flex; align-items: center; justify-content: center; gap: 10px; background-color: #25D366; color: white; padding: 16px; border-radius: 10px; font-weight: 800; font-size: 1.1rem; text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; }
          .hero-wa-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(37,211,102,0.2); }

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

                          {/* FIXED: WhatsApp Button is now correctly injected! */}
                          <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '10px' }}>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '10px' }}>Or apply directly via WhatsApp:</p>
                            <a 
                              href={`https://wa.me/601118648860?text=${encodeURIComponent(waMessage)}`}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hero-wa-btn"
                            >
                              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                              APPLY VIA WHATSAPP
                            </a>
                          </div>

                        </form>
                      </div>
                    )}
                  </div>
                  
                  {/* FIXED: objectFit set to 'contain' to avoid image crop */}
                  <div className="camp-img-container">
                    <img src={summerCampImg} alt="Summer Camp Poster" style={{ width: '100%', height: 'auto', maxHeight: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block', borderRadius: '16px' }} />
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