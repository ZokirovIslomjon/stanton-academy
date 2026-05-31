import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Make sure this path is correct for your project!
import summerCampImg from '../assets/landing.jpg'; 

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const [campForm, setCampForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });

  const handleCampSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    // Map the Summer Camp fields to match your Google Sheet columns
    const sheetData = {
      data: [
        {
          Name: campForm.name,
          Nationality: 'N/A', // Not asked on this form
          Age: 'N/A', // Not asked on this form
          Phone: `'${campForm.phone}`, // Apostrophe prevents Google Sheets math errors!
          Email: campForm.email,
          Course: 'Summer Camp 2026',
          HearAbout: 'N/A',
          Message: `Location: ${campForm.location}`,
          Date: new Date().toLocaleString()
        }
      ]
    };

    try {
      // Sending data to your SheetDB API
      const response = await fetch('https://sheetdb.io/api/v1/k5ohu0497ek0x', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sheetData)
      });

      if (response.ok) {
        alert(`Thank you ${campForm.name}! Your Summer Camp application has been submitted successfully.`);
        
        // Google Ads Conversion Tracking
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'ads_conversion_Submit_lead_form_1', {
             'event_category': 'Lead Form',
             'event_label': 'Summer Camp 2026' 
          });
        }
        
        // Clear the form
        setCampForm({ name: '', email: '', phone: '', location: '' });
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      alert('Failed to send application. Please try again or contact us directly on WhatsApp.');
    } finally {
      setIsSending(false);
    }
  };

  const slides = [
    {
      id: 1,
      type: 'standard',
      headline: "We don't just teach English,",
      highlight: "we change people's lives!",
      subtext: "Master the English language with Stanton Academy's world-class curriculum.",
      btnText: "Sign up for the first lesson ✨",
      duration: 5000 
    },
    {
      id: 2,
      type: 'form',
      headlineStart: "Join The ",
      headlineEnd: "Summer Camp",
      subtext: "Multicultural And English language center in Kuala Lumpur",
      callToAction: "Apply for this Summer Today!",
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
      
      <style>
        {`
          /* Controls the main section height */
          .hero-section-wrapper {
            display: flex;
            align-items: center;
            position: relative;
            padding: 140px 0 80px;
            min-height: 750px;
          }
          .camp-card {
            display: flex;
            flex-wrap: wrap;
            align-items: stretch;
            gap: 40px;
            text-align: left;
            background-color: #fff9e6;
            padding: 40px;
            border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.05);
          }
          .camp-headline { font-size: 2.8rem; font-weight: 800; line-height: 1.2; margin-bottom: 10px; }
          .camp-subtitle { font-size: 1.1rem; margin-bottom: 30px; }
          .camp-cta { font-size: 1.3rem; margin-bottom: 20px; font-weight: 700; }
          .camp-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
          .camp-img-container { flex: 1 1 400px; display: flex; border-radius: 16px; overflow: hidden; min-height: 350px; }
          
          .standard-slide-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
          }

          @media (max-width: 768px) {
            /* Removes the forced height on mobile so the empty space disappears */
            .hero-section-wrapper {
              min-height: auto;
              padding: 120px 0 40px; 
            }
            .camp-card { padding: 25px; gap: 20px; }
            .camp-headline { font-size: 2.1rem; }
            .camp-subtitle { font-size: 0.95rem; margin-bottom: 20px; }
            .camp-cta { font-size: 1.1rem; margin-bottom: 15px; }
            .camp-form-grid { grid-template-columns: 1fr; }
            .camp-img-container { flex: 1 1 100%; min-height: 220px; max-height: 280px; }
          }
        `}
      </style>

      <div className="hero-background-blobs"></div>

      <div className="container" style={{ position: 'relative', width: '100%' }}>
        
        {/* Dynamic Wrapper: Resizes exactly to the currently active slide */}
        <div style={{ position: 'relative', width: '100%' }}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              style={{
                /* If active, it dictates the height. If hidden, it takes up no space */
                position: index === currentSlide ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                opacity: index === currentSlide ? 1 : 0,
                visibility: index === currentSlide ? 'visible' : 'hidden',
                transition: 'opacity 0.8s ease-in-out, visibility 0.8s',
                zIndex: index === currentSlide ? 10 : 1,
              }}
            >
              {slide.type === 'form' ? (
                <div className="camp-card">
                  
                  {/* Left Side: Form */}
                  <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h1 className="camp-headline">
                      <span style={{ color: '#006B3F' }}>{slide.headlineStart}</span>
                      <span style={{ color: '#FFC72C' }}>{slide.headlineEnd}</span>
                    </h1>
                    <p className="camp-subtitle" style={{ color: '#006B3F', fontStyle: 'italic' }}>
                      {slide.subtext}
                    </p>
                    
                    <h3 className="camp-cta" style={{ color: '#006B3F' }}>
                      {slide.callToAction}
                    </h3>

                    <form onSubmit={handleCampSubmit} className="camp-form-grid">
                      <input 
                        type="text" 
                        placeholder="Your Name*" 
                        required 
                        value={campForm.name}
                        onChange={(e) => setCampForm({...campForm, name: e.target.value})}
                        disabled={isSending}
                        style={{ padding: '14px 20px', border: '2px solid #e5e7eb', borderRadius: '10px', width: '100%', backgroundColor: '#ffffff', fontSize: '0.95rem', outline: 'none', transition: 'border 0.3s' }}
                      />
                      <input 
                        type="email" 
                        placeholder="Your Email*" 
                        required 
                        value={campForm.email}
                        onChange={(e) => setCampForm({...campForm, email: e.target.value})}
                        disabled={isSending}
                        style={{ padding: '14px 20px', border: '2px solid #e5e7eb', borderRadius: '10px', width: '100%', backgroundColor: '#ffffff', fontSize: '0.95rem', outline: 'none', transition: 'border 0.3s' }}
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone Number*" 
                        required 
                        value={campForm.phone}
                        onChange={(e) => setCampForm({...campForm, phone: e.target.value})}
                        disabled={isSending}
                        style={{ padding: '14px 20px', border: '2px solid #e5e7eb', borderRadius: '10px', width: '100%', backgroundColor: '#ffffff', fontSize: '0.95rem', outline: 'none', transition: 'border 0.3s' }}
                      />
                      <select 
                        required
                        value={campForm.location}
                        onChange={(e) => setCampForm({...campForm, location: e.target.value})}
                        disabled={isSending}
                        style={{ padding: '14px 20px', border: '2px solid #e5e7eb', borderRadius: '10px', width: '100%', backgroundColor: '#ffffff', fontSize: '0.95rem', outline: 'none', color: campForm.location ? '#1a1a1a' : '#9ca3af', transition: 'border 0.3s' }}
                      >
                        <option value="" disabled>Where do you live?*</option>
                        <option value="Kuala Lumpur">Kuala Lumpur</option>
                        <option value="Selangor">Selangor</option>
                        <option value="Other Malaysia">Other (Malaysia)</option>
                        <option value="International">International</option>
                      </select>

                      <button 
                        type="submit" 
                        disabled={isSending}
                        style={{ gridColumn: '1 / -1', backgroundColor: '#006B3F', color: '#FFC72C', padding: '16px', border: 'none', borderRadius: '10px', fontWeight: '800', cursor: isSending ? 'not-allowed' : 'pointer', fontSize: '1.1rem', marginTop: '10px', transition: 'transform 0.2s, opacity 0.2s', opacity: isSending ? '0.7' : '1' }}
                        onMouseOver={(e) => !isSending && (e.currentTarget.style.opacity = '0.9')}
                        onMouseOut={(e) => !isSending && (e.currentTarget.style.opacity = '1')}
                      >
                        {isSending ? 'SENDING...' : 'SUBMIT APPLICATION'}
                      </button>
                    </form>
                  </div>

                  {/* Right Side: Poster Image */}
                  <div className="camp-img-container">
                    <img 
                      src={summerCampImg} 
                      alt="Summer Camp Poster" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} 
                    />
                  </div>

                </div>
              ) : (
                <div className="standard-slide-wrapper">
                  <div className="hero-text-centered">
                    <h1>{slide.headline} <span style={{ color: '#FFC72C' }}>{slide.highlight}</span></h1>
                    <p>{slide.subtext}</p>
                    <div className="cta-buttons centered-btns">
                      <Link to="/signup" className="btn btn-primary">
                        {slide.btnText}
                      </Link>
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
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                border: 'none',
                backgroundColor: idx === currentSlide ? '#006B3F' : '#d1d5db',
                cursor: 'pointer', 
                transition: 'all 0.3s ease',
                transform: idx === currentSlide ? 'scale(1.3)' : 'scale(1)',
                boxShadow: idx === currentSlide ? '0 0 10px rgba(0, 107, 63, 0.3)' : 'none'
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;