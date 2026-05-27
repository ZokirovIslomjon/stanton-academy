import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import your images here
import summerCampImg from '../assets/landing.png'; 

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Form state for the Summer Camp slide
  const [campForm, setCampForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });

  const handleCampSubmit = (e) => {
    e.preventDefault();
    console.log("Summer Camp Form Submitted:", campForm);
    // You can hook this up to EmailJS just like your RegisterModal!
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
    },
    {
      id: 2,
      type: 'form',
      headline: "Join The Summer Camp",
      subtext: "Multicultural And English language center in Kuala Lumpur",
      callToAction: "Apply for this Summer Today!"
    }
  ];

  // Auto-play timer (5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero new-hero-style" style={{ minHeight: '650px', display: 'flex', alignItems: 'center' }}>
      <div className="hero-background-blobs"></div>

      <div className="container" style={{ position: 'relative', width: '100%', height: '100%' }}>
        
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              opacity: index === currentSlide ? 1 : 0,
              visibility: index === currentSlide ? 'visible' : 'hidden',
              transition: 'opacity 0.8s ease-in-out, visibility 0.8s',
              position: index === 0 ? 'relative' : 'absolute', 
              top: 0,
              left: 0,
              width: '100%',
              zIndex: index === currentSlide ? 10 : 1,
            }}
          >
            {slide.type === 'form' ? (
              // --- SLIDE 2: SUMMER CAMP FORM LAYOUT ---
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '50px', textAlign: 'left', backgroundColor: '#fff9e6', padding: '40px', borderRadius: '20px' }}>
                
                {/* Left Side: Form */}
                <div style={{ flex: '1 1 450px' }}>
                  <h1 style={{ fontSize: '3rem', color: '#1a1a1a', fontWeight: '800', lineHeight: '1.1', marginBottom: '10px' }}>
                    {slide.headline}
                  </h1>
                  <p style={{ fontSize: '1.1rem', color: '#444', fontStyle: 'italic', marginBottom: '30px' }}>
                    {slide.subtext}
                  </p>
                  
                  <h3 style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '20px' }}>
                    {slide.callToAction}
                  </h3>

                  <form onSubmit={handleCampSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <input 
                      type="text" 
                      placeholder="Your Name*" 
                      required 
                      value={campForm.name}
                      onChange={(e) => setCampForm({...campForm, name: e.target.value})}
                      style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '5px', width: '100%', backgroundColor: 'transparent' }}
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email*" 
                      required 
                      value={campForm.email}
                      onChange={(e) => setCampForm({...campForm, email: e.target.value})}
                      style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '5px', width: '100%', backgroundColor: 'transparent' }}
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number*" 
                      required 
                      value={campForm.phone}
                      onChange={(e) => setCampForm({...campForm, phone: e.target.value})}
                      style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '5px', width: '100%', backgroundColor: 'transparent' }}
                    />
                    <select 
                      required
                      value={campForm.location}
                      onChange={(e) => setCampForm({...campForm, location: e.target.value})}
                      style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '5px', width: '100%', backgroundColor: 'transparent', color: campForm.location ? '#000' : '#757575' }}
                    >
                      <option value="" disabled>Where do you live?*</option>
                      <option value="Kuala Lumpur">Kuala Lumpur</option>
                      <option value="Selangor">Selangor</option>
                      <option value="Other Malaysia">Other (Malaysia)</option>
                      <option value="International">International</option>
                    </select>

                    <button type="submit" style={{ gridColumn: '1 / 2', backgroundColor: '#f97316', color: 'white', padding: '15px 30px', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', marginTop: '10px' }}>
                      SUBMIT
                    </button>
                  </form>
                </div>

                {/* Right Side: Poster Image */}
                <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: '100%', maxWidth: '600px', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', border: '8px solid white' }}>
                    {/* Summer camp banner */}
                    { <img src={summerCampImg} alt="Summer Camp Poster" style={{ width: '100%', height: 'auto', display: 'block' }} />}
                    
                    {/* Placeholder so you can see the layout before adding the image */}
                    <div style={{ width: '100%', height: '400px', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#6b7280', fontWeight: 'bold' }}>[Your Poster Image Will Go Here]</span>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              // --- SLIDE 1: STANDARD HERO LAYOUT ---
              <div className="hero-text-centered" style={{ paddingTop: '50px' }}>
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
                backgroundColor: idx === currentSlide ? '#006B3F' : '#e5e7eb',
                cursor: 'pointer', 
                transition: 'all 0.3s ease',
                transform: idx === currentSlide ? 'scale(1.2)' : 'scale(1)'
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