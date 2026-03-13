import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

import myLogo from '../assets/logo-new.png';


emailjs.init('5j3dR4oz_QORxuNJS');


const EMAILJS_SERVICE_ID  = 'service_giayoc6';
const EMAILJS_TEMPLATE_ID = 'template_1b3ug2u';
const EMAILJS_PUBLIC_KEY  = '5j3dR4oz_QORxuNJS';

const styles = `
  /* ----- Google Fonts ----- */
  .su__root {
    min-height: 100vh;
    background: radial-gradient(circle at 30% 20%, #004d2d 0%, #001a11 100%);
    font-family: 'Poppins', sans-serif;
    color: white;
    padding: 30px 40px;
    display: flex;
    justify-content: center;
    position: relative;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  /* Decorative Background Glow */
  .su__root::before {
    content: '';
    position: absolute;
    top: -10%;
    left: -10%;
    width: 50vw;
    height: 50vw;
    background: radial-gradient(circle, rgba(255, 199, 44, 0.05) 0%, transparent 60%);
    z-index: 0;
  }

  /* Use flex column to keep header at top and center content */
  .su__container {
    max-width: 1200px;
    width: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
  }

  /* ----- HEADER ----- */
  .su__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0; /* Prevents header from shrinking */
    padding-bottom: 20px;
  }

  .su__logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 700;
    font-size: 1.4rem;
    color: white;
  }

  .su__lang-selector {
    color: white;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
    padding: 8px 16px;
    border-radius: 50px;
    transition: background 0.2s;
  }

  .su__lang-selector:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  /* ----- MAIN LAYOUT GRID ----- */
  .su__content {
    flex-grow: 1; /* Takes up remaining space below header */
    display: flex;
    justify-content: center;
    align-items: center; /* Centers items vertically */
    gap: 80px;
    flex-wrap: wrap;
    padding: 40px 0;
  }

  /* ----- LEFT COLUMN ----- */
  .su__left-col {
    flex: 1;
    min-width: 320px;
    position: relative;
    max-width: 500px;
  }

  .su__left-col h1 {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin: 0 0 30px 0;
    color: white;
  }

  .su__arrow {
    position: absolute;
    top: 20px;
    right: -40px;
    width: 50px;
    height: 50px;
    stroke: white;
    fill: none;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .su__promo-card {
    background: linear-gradient(135deg, #FFC72C 0%, #E5A900 100%);
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 250px;
  }

  .su__promo-image {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }

  /* ----- RIGHT COLUMN (Smaller Form) ----- */
  .su__right-col {
    flex: 0.8;
    min-width: 320px;
    max-width: 400px;
  }

  .su__form-card {
    background: white;
    border-radius: 24px;
    padding: 40px 35px;
    box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.1), 0 30px 60px rgba(0, 0, 0, 0.4);
    text-align: center;
  }

  .su__form-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #002b1a;
    margin: 0 0 30px 0;
    line-height: 1.3;
  }

  .su__field {
    margin-bottom: 20px;
    text-align: left;
  }

  .su__input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #e5e7eb;
    padding: 10px 0;
    font-size: 0.95rem;
    font-family: inherit;
    color: #1f2937;
    background: transparent;
    transition: all 0.3s ease;
    outline: none;
    box-sizing: border-box;
  }

  .su__input::placeholder {
    color: #9ca3af;
  }

  .su__input:focus {
    border-bottom-color: #006B3F;
  }

  .su__select {
    cursor: pointer;
    appearance: none;
    color: #9ca3af;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right center;
  }
  .su__select:focus {
    color: #1f2937;
  }

  .su__submit {
    width: 100%;
    background: #006B3F;
    color: white;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    padding: 14px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    margin-top: 10px;
    transition: all 0.3s ease;
  }

  .su__submit:hover:not(:disabled) {
    background: #008f54;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 107, 63, 0.3);
  }

  .su__submit:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .su__back {
    background: none;
    border: none;
    color: #9ca3af;
    font-size: 0.85rem;
    cursor: pointer;
    margin-top: 20px;
    transition: color 0.2s;
  }
  .su__back:hover {
    color: #006B3F;
  }

  .su__alert {
    padding: 12px;
    border-radius: 8px;
    font-size: 0.9rem;
    margin-bottom: 20px;
    text-align: left;
  }
  .su__alert--success {
    background: #f0fdf4;
    color: #15803d;
    border: 1px solid #bbf7d0;
  }
  .su__alert--error {
    background: #fef2f2;
    color: #b91c1c;
    border: 1px solid #fecaca;
  }

  
  /* Responsive Adjustments */
  @media (max-width: 950px) {
    .su__root {
      padding: 20px;
    }
    .su__content {
      flex-direction: column;
      gap: 40px;
      padding: 10px 0;
    }
    .su__left-col, .su__right-col {
      width: 100%;
      max-width: 100%;
    }
    .su__arrow {
      display: none;
    }
    .su__left-col h1 {
      font-size: 2.5rem; /* Smaller for tablets */
      text-align: center;
      margin-bottom: 25px;
    }
    .su__form-card {
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
      padding: 30px 20px;
    }
    /* Center and shrink the poster container on tablets */
    .su__promo-card {
      max-width: 450px;
      margin: 0 auto; 
      min-height: auto;
    }
  }

  /* Specific Adjustments for Mobile Phones */
  @media (max-width: 600px) {
    .su__left-col h1 {
      font-size: 1.2rem; /* Made the text smaller */
      margin-top: 30px; /* Pushes the text down so it doesn't overlap the logo */
      margin-bottom: 20px;
    }
    
    /* Forces the 800x450 rectangular proportion (16:9) */
    .su__promo-card {
      width: 100%;
      max-width: 400px; 
      aspect-ratio: 800 / 450; /* Creates the exact dimensions you requested */
      min-height: auto; /* Removes the old rule that made it a square */
      margin: 0 auto; 
      border-radius: 12px;
    }

    /* Ensures the image fills the new rectangular box perfectly */
    .su__promo-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .su__logo img {
      height: 35px; /* Adjusts logo size for mobile */
    }
  }
`;

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const id = 'su-google-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSending(true);
    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_name: 'Stanton Academy',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        course: formData.course || 'Intensive Beginner',
        message: `New application from ${formData.name} for the ${formData.course || 'Intensive Beginner'} course.`,
        reply_to: formData.email,
      },
      EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setSuccessMessage(`Thank you, ${formData.name}! We'll contact you shortly.`);
        setFormData({ name: '', email: '', phone: '', course: '' });
        setIsSending(false);
        setTimeout(() => navigate('/'), 3000);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage('Failed to send. Please try again or reach us on WhatsApp.');
        setIsSending(false);
      });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="su__root">
        <div className="su__container">
          
          {/* HEADER (Stays at top) */}
{/* HEADER (Stays at top) */}
<header className="su__header">
  <div className="su__logo">
    <img 
      src={myLogo} 
      alt="Stanton Academy Logo" 
      style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
    />
  </div>
</header>

          {/* MAIN CONTENT (Centers vertically and horizontally) */}
          <div className="su__content">
            
            <div className="su__left-col">
              <h1>Want to learn<br/>New Language?</h1>
              
              <svg className="su__arrow" viewBox="0 0 24 24">
                <path d="M9 5c5 0 8 3 8 8v6" />
                <path d="M13 15l4 4 4-4" />
              </svg>

              <div className="su__promo-card">
                {/* INSERT YOUR POSTER IMAGE PATH HERE */}
                <img 
                  src="https://via.placeholder.com/600x400/FFC72C/002b1a?text=Insert+Your+Poster+Here" 
                  alt="Language Learning Poster" 
                  className="su__promo-image" 
                />
              </div>
            </div>

            <div className="su__right-col">
              <div className="su__form-card">
                <h2 className="su__form-title">Register now to enroll<br/>in classes</h2>

                {successMessage && <div className="su__alert su__alert--success">✓ {successMessage}</div>}
                {errorMessage && <div className="su__alert su__alert--error">⚠️ {errorMessage}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="su__field">
                    <input
                      type="text"
                      name="name"
                      className="su__input"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSending}
                      required
                    />
                  </div>

                  <div className="su__field">
                    <input
                      type="tel"
                      name="phone"
                      className="su__input"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSending}
                      required
                    />
                  </div>

                  <div className="su__field">
                    <input
                      type="email"
                      name="email"
                      className="su__input"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSending}
                      required
                    />
                  </div>

                  <div className="su__field">
                    <select
                      name="course"
                      className="su__input su__select"
                      value={formData.course}
                      onChange={handleChange}
                      disabled={isSending}
                    >
                      <option value="" disabled hidden>Choose a course</option>
                      <option value="Intensive Beginner">Intensive Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Chinese Language">Chinese Language</option>
                    </select>
                  </div>

                  <button type="submit" className="su__submit" disabled={isSending}>
                    {isSending ? 'Sending...' : 'Yes, call me!'}
                  </button>
                </form>

                <button className="su__back" onClick={() => navigate(-1)}>
                  ← Go back
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}