import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Make sure this path is correct for your project!
import summerCampImg from '../assets/landing.png'; 

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [campForm, setCampForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });

  const handleCampSubmit = (e) => {
    e.preventDefault();
    console.log("Summer Camp Form Submitted:", campForm);
    alert("Application submitted successfully!");
    setCampForm({ name: '', email: '', phone: '', location: '' });
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
    <section className="hero new-hero-style" style={{ minHeight: '750px', display: 'flex', alignItems: 'center', position: 'relative', paddingBottom: '60px' }}>
      
      {/* This style block handles the responsive layout. 
        When the screen is below 768px (phones), the text shrinks and the form stacks! 
      */}
      <style>
        {`
          .slide-content-wrapper {
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            transform: translateY(-50%);
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
          
          /* Mobile Adjustments */
          @media (max-width: 768px) {
            .slide-content-wrapper {
              top: 55%; /* Pushes the slide down slightly so it doesn't hit the logo */
            }
            .camp-card {
              padding: 25px;
              gap: 20px;
            }
            .camp-headline { font-size: 2.1rem; }
            .camp-subtitle { font-size: 0.95rem; margin-bottom: 20px; }
            .camp-cta { font-size: 1.1rem; margin-bottom: 15px; }
            .camp-form-grid { grid-template-columns: 1fr; } /* Changes form to 1 column */
          }
        `}
      </style>

      <div className="hero-background-blobs"></div>

      <div className="container" style={{ position: 'relative', width: '100%' }}>
        
        {/* SLIDES WRAPPER */}
        <div style={{ position: 'relative', minHeight: '600px', width: '100%', display: 'flex', alignItems: 'center' }}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="slide-content-wrapper"
              style={{
                opacity: index === currentSlide ? 1 : 0,
                visibility: index === currentSlide ? 'visible' : 'hidden',
                transition: 'opacity 0.8s ease-in-out, visibility 0.8s',
                zIndex: index === currentSlide ? 10 : 1,
              }}
            >
              {slide.type === 'form' ? (
                // --- SLIDE 2: SUMMER CAMP FORM LAYOUT ---
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
                        style={{ padding: '14px 20px', border: '2px solid #e5e7eb', borderRadius: '10px', width: '100%', backgroundColor: '#ffffff', fontSize: '0.95rem', outline: 'none', transition: 'border 0.3s' }}
                      />
                      <input 
                        type="email" 
                        placeholder="Your Email*" 
                        required 
                        value={campForm.email}
                        onChange={(e) => setCampForm({...campForm, email: e.target.value})}
                        style={{ padding: '14px 20px', border: '2px solid #e5e7eb', borderRadius: '10px', width: '100%', backgroundColor: '#ffffff', fontSize: '0.95rem', outline: 'none', transition: 'border 0.3s' }}
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone Number*" 
                        required 
                        value={campForm.phone}
                        onChange={(e) => setCampForm({...campForm, phone: e.target.value})}
                        style={{ padding: '14px 20px', border: '2px solid #e5e7eb', borderRadius: '10px', width: '100%', backgroundColor: '#ffffff', fontSize: '0.95rem', outline: 'none', transition: 'border 0.3s' }}
                      />
                      <select 
                        required
                        value={campForm.location}
                        onChange={(e) => setCampForm({...campForm, location: e.target.value})}
                        style={{ padding: '14px 20px', border: '2px solid #e5e7eb', borderRadius: '10px', width: '100%', backgroundColor: '#ffffff', fontSize: '0.95rem', outline: 'none', color: campForm.location ? '#1a1a1a' : '#9ca3af', transition: 'border 0.3s' }}
                      >
                        <option value="" disabled>Where do you live?*</option>
                        <option value="Kuala Lumpur">Kuala Lumpur</option>
                        <option value="Selangor">Selangor</option>
                        <option value="Other Malaysia">Other (Malaysia)</option>
                        <option value="International">International</option>
                      </select>

                      <button type="submit" style={{ gridColumn: '1 / -1', backgroundColor: '#006B3F', color: '#FFC72C', padding: '16px', border: 'none', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', fontSize: '1.1rem', marginTop: '10px', transition: 'transform 0.2s, opacity 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        SUBMIT APPLICATION
                      </button>
                    </form>
                  </div>

                  {/* Right Side: Poster Image */}
                  <div style={{ flex: '1 1 400px', display: 'flex' }}>
                    <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', display: 'flex' }}>
                      <img 
                        src={summerCampImg} 
                        alt="Summer Camp Poster" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} 
                      />
                    </div>
                  </div>

                </div>
              ) : (
                // --- SLIDE 1: STANDARD HERO LAYOUT ---
                <div className="hero-text-centered">
                  <h1>{slide.headline} <span style={{ color: '#FFC72C' }}>{slide.highlight}</span></h1>
                  <p>{slide.subtext}</p>
                  <div className="cta-buttons centered-btns">
                    <Link to="/signup" className="btn btn-primary">
                      {slide.btnText}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', position: 'absolute', bottom: '-40px', left: '0', right: '0', zIndex: 20 }}>
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