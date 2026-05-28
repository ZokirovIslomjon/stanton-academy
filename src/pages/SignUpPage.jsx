import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import logo from '../assets/logo-new.png'; 

// Imported your exact file formats
import poster1 from '../assets/poster1.jpeg';
import poster2 from '../assets/poster2.png';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSending, setIsSending] = useState(false);

  // Array updated to use only your two posters
  const sliderImages = [poster1, poster2];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: ''
  });

  // Slider Timer: Changes every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const templateParams = {
      to_name: 'Stanton Academy',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      course: formData.course,
      message: `New application from ${formData.name} for ${formData.course} course`,
      reply_to: formData.email
    };

    emailjs.send(
      'service_giayoc6', 
      'template_1b3ug2u', 
      templateParams, 
      '5j3dR4oz_QORxuNJS'
    )
      .then((response) => {
        console.log('SUCCESS!', response);
        alert(`Thank you ${formData.name}! Your application has been submitted successfully. We will contact you shortly.`);
        
        // Google Ads Conversion Tracking
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'ads_conversion_Submit_lead_form_1', {
             'event_category': 'Lead Form',
             'event_label': formData.course 
          });
        }
        
        setFormData({ name: '', email: '', phone: '', course: '' });
        setIsSending(false);
      })
      .catch((error) => {
        console.error('EmailJS Error Details:', error);
        alert('Failed to send application. Please contact us directly at info@stanton-academy.com');
        setIsSending(false);
      });
  };

  return (
    <div className="signup-page-wrapper">
      <style>
        {`
          .signup-page-wrapper {
            min-height: 100vh;
            background-color: #022c19; 
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            position: relative;
          }
          
          .signup-logo {
            position: absolute;
            top: 30px;
            left: 40px;
            height: 50px;
          }

          .signup-container {
            display: flex;
            align-items: center; /* Aligns them evenly in the center */
            justify-content: center;
            gap: 60px;
            max-width: 1100px;
            width: 100%;
          }

          /* LEFT SIDE: Slider */
          .signup-left {
            flex: 1;
            display: flex;
            justify-content: center;
          }

          /* 4:5 Aspect Ratio Slider Container */
          .slider-container {
            position: relative;
            width: 100%;
            max-width: 450px; /* Matched the max-width of the form */
            aspect-ratio: 4 / 5; /* Keeps your 4:5 portrait ratio */
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4);
            border: 5px solid #e5f0ea; 
          }

          .slider-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover; 
            transition: opacity 1s ease-in-out;
          }

          /* RIGHT SIDE: Form Card */
          .signup-right {
            flex: 1;
            max-width: 450px; /* Matched the max-width of the poster */
            width: 100%;
          }

          .signup-card {
            background: #ffffff;
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.2);
            text-align: center;
          }

          .signup-card h2 {
            font-size: 1.6rem;
            color: #1a1a1a;
            font-weight: 800;
            margin-bottom: 30px;
            line-height: 1.3;
          }

          .signup-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .signup-input {
            width: 100%;
            padding: 12px 0;
            border: none;
            border-bottom: 2px solid #f3f4f6;
            font-size: 1rem;
            color: #1a1a1a;
            outline: none;
            background: transparent;
            transition: border-color 0.3s;
          }

          .signup-input::placeholder {
            color: #9ca3af;
          }

          .signup-input:focus {
            border-bottom: 2px solid #006B3F;
          }

          select.signup-input {
            color: #9ca3af;
            cursor: pointer;
          }
          
          select.signup-input:valid {
            color: #1a1a1a;
          }

          .btn-call {
            background-color: #006B3F;
            color: #ffffff;
            border: none;
            padding: 16px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 1.1rem;
            margin-top: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .btn-call:hover:not(:disabled) {
            background-color: #00502f;
            transform: translateY(-2px);
          }
          
          .btn-call:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .btn-back {
            background: none;
            border: none;
            color: #9ca3af;
            font-size: 0.95rem;
            margin-top: 20px;
            cursor: pointer;
            transition: color 0.3s;
          }

          .btn-back:hover {
            color: #4b5563;
          }

          /* Mobile Responsiveness */
          @media (max-width: 900px) {
            .signup-container {
              flex-direction: column;
              gap: 50px;
            }
            .signup-logo {
              position: static;
              margin-bottom: 30px;
            }
            .signup-page-wrapper {
              padding-top: 40px;
              flex-direction: column;
            }
          }
        `}
      </style>

      {/* Top Left Logo */}
      <Link to="/">
        <img src={logo} alt="Stanton Academy" className="signup-logo" />
      </Link>

      <div className="signup-container">
        
        {/* LEFT SIDE (Poster Slider) */}
        <div className="signup-left">
          <div className="slider-container">
            {sliderImages.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`Slide ${index + 1}`} 
                className="slider-image"
                style={{ 
                  opacity: index === currentSlide ? 1 : 0,
                  zIndex: index === currentSlide ? 2 : 1
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE (Form) */}
        <div className="signup-right">
          <div className="signup-card">
            <h2>Register now to enroll<br/>in classes</h2>
            
            <form onSubmit={handleSubmit} className="signup-form">
              <input 
                type="text" 
                placeholder="Name" 
                required 
                className="signup-input"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={isSending}
              />
              
              <input 
                type="tel" 
                placeholder="Phone Number" 
                required 
                className="signup-input"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                disabled={isSending}
              />
              
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
                className="signup-input"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                disabled={isSending}
              />
              
              <select 
                required 
                className="signup-input"
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
                disabled={isSending}
              >
                <option value="" disabled hidden>Choose a course</option>
                <option value="Intensive Beginner">Intensive Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Chinese Language">Chinese Language</option>
              </select>

              <button type="submit" className="btn-call" disabled={isSending}>
                {isSending ? 'Sending...' : 'Yes, call me!'}
              </button>
            </form>

            <button className="btn-back" onClick={() => navigate(-1)}>
              &larr; Go back
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;