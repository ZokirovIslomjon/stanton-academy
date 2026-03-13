import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

emailjs.init('5j3dR4oz_QORxuNJS');

const EMAILJS_SERVICE_ID  = 'service_giayoc6';
const EMAILJS_TEMPLATE_ID = 'template_1b3ug2u';
const EMAILJS_PUBLIC_KEY  = '5j3dR4oz_QORxuNJS';

const styles = `
  /* ----- Google Fonts (loaded via <link> in useEffect) ----- */
  .su__root {
    min-height: 100vh;
    background: linear-gradient(145deg, #004d2d 0%, #002b1a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
    padding: 40px 20px;
    box-sizing: border-box;
  }

  /* decorative blobs */
  .su__root::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255, 199, 44, 0.15) 0%, transparent 70%);
    top: -200px;
    left: -200px;
    border-radius: 50%;
    animation: su__blobMove 12s ease-in-out infinite alternate;
  }
  .su__root::after {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255, 199, 44, 0.1) 0%, transparent 70%);
    bottom: -150px;
    right: -150px;
    border-radius: 50%;
    animation: su__blobMove 15s ease-in-out infinite alternate-reverse;
  }

  @keyframes su__blobMove {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(40px, 30px) scale(1.1); }
  }

  /* main card */
  .su__grid {
    display: grid;
    grid-template-columns: 0.8fr 1.2fr; /* right panel larger, shifted left */
    max-width: 1100px;
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-radius: 32px;
    overflow: hidden;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 199, 44, 0.25);
    position: relative;
    z-index: 2;
    animation: su__fadeUp 0.7s ease both;
  }

  @keyframes su__fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ----- LEFT PANEL (only headline now) ----- */
  .su__left {
    background: linear-gradient(145deg, #0d2a1c 0%, #092015 100%);
    padding: 60px 45px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    border-right: 1px solid rgba(255, 199, 44, 0.2);
  }

  .su__left h1 {
    font-family: 'Syne', sans-serif;
    font-size: 2.8rem;
    font-weight: 800;
    line-height: 1.2;
    margin: 0;
    color: white;
  }

  .su__left h1 .su__highlight {
    color: #FFC72C;
    text-decoration: underline;
    text-underline-offset: 12px;
    text-decoration-thickness: 3px;
  }

  /* ----- RIGHT PANEL (form, shifted left) ----- */
  .su__right {
    background: white;
    padding: 55px 45px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: -20px; /* pull the right panel slightly left */
  }

  .su__form-title {
    font-family: 'Syne', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #006B3F;
    margin: 0 0 10px 0;
  }

  .su__form-sub {
    color: #4b5563;
    font-size: 0.95rem;
    margin: 0 0 30px 0;
    border-bottom: 2px dashed #FFC72C;
    padding-bottom: 15px;
  }

  .su__field {
    margin-bottom: 20px;
  }

  .su__field label {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 6px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  .su__input {
    width: 100%;
    padding: 14px 16px;
    border: 1.5px solid #e5e7eb;
    border-radius: 14px;
    font-size: 0.95rem;
    font-family: 'DM Sans', sans-serif;
    background-color: #f9fafb;
    transition: all 0.2s ease;
    outline: none;
    box-sizing: border-box;
  }

  .su__input:focus {
    border-color: #FFC72C;
    background-color: #ffffff;
    box-shadow: 0 0 0 4px rgba(255, 199, 44, 0.15);
  }

  .su__select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    background-color: #f9fafb;
    padding-right: 44px;
    cursor: pointer;
    appearance: none;
  }

  .su__submit {
    width: 100%;
    padding: 16px;
    background: #006B3F;
    color: white;
    border: none;
    border-radius: 50px;
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s ease;
    margin: 10px 0 0 0;
    box-shadow: 0 8px 20px rgba(0, 107, 63, 0.3);
  }

  .su__submit:hover:not(:disabled) {
    background: #008f54;
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(0, 107, 63, 0.4);
  }

  .su__submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .su__offline-note {
    margin-top: 25px;
    font-size: 0.9rem;
    color: #6b7280;
    text-align: center;
    font-style: italic;
    border-top: 1px solid #e5e7eb;
    padding-top: 20px;
  }

  .su__back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    color: #9ca3af;
    font-size: 0.85rem;
    cursor: pointer;
    margin-top: 15px;
    padding: 0;
    transition: color 0.2s;
  }
  .su__back:hover { color: #006B3F; }

  .su__alert {
    padding: 12px 16px;
    border-radius: 12px;
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
  .su__alert--success {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #15803d;
  }
  .su__alert--error {
    background: #fff1f2;
    border: 1px solid #fecdd3;
    color: #be123c;
  }

  /* responsive */
  @media (max-width: 800px) {
    .su__grid {
      grid-template-columns: 1fr;
    }
    .su__left {
      border-right: none;
      border-bottom: 1px solid rgba(255,199,44,0.2);
    }
    .su__right {
      margin-left: 0; /* reset on mobile */
    }
    .su__left h1 {
      font-size: 2.2rem;
    }
  }
`;

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'Intensive Beginner'
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
      link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap';
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
        course: formData.course,
        message: `New application from ${formData.name} for the ${formData.course} course.`,
        reply_to: formData.email,
      },
      EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setSuccessMessage(`Thank you, ${formData.name}! We'll contact you shortly.`);
        setFormData({ name: '', email: '', phone: '', course: 'Intensive Beginner' });
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
        <div className="su__grid">
          {/* LEFT PANEL – only headline */}
          <div className="su__left">
            <h1>
              Want to learn{' '}
              <span className="su__highlight">new language?</span>
            </h1>
          </div>

          {/* RIGHT PANEL – registration form */}
          <div className="su__right">
            <h2 className="su__form-title">Register now to enroll in classes</h2>
            <p className="su__form-sub">Fill in the form and we'll call you back.</p>

            {successMessage && (
              <div className="su__alert su__alert--success">✓ {successMessage}</div>
            )}
            {errorMessage && (
              <div className="su__alert su__alert--error">⚠️ {errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="su__field">
                <label htmlFor="su-name">Name</label>
                <input
                  type="text"
                  id="su-name"
                  name="name"
                  className="su__input"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSending}
                  required
                />
              </div>

              <div className="su__field">
                <label htmlFor="su-phone">Phone Number</label>
                <input
                  type="tel"
                  id="su-phone"
                  name="phone"
                  className="su__input"
                  placeholder="+60 12-345-6789"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSending}
                  required
                />
              </div>

              <div className="su__field">
                <label htmlFor="su-email">Email Address</label>
                <input
                  type="email"
                  id="su-email"
                  name="email"
                  className="su__input"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSending}
                  required
                />
              </div>

              <div className="su__field">
                <label htmlFor="su-course">Choose a course</label>
                <select
                  id="su-course"
                  name="course"
                  className="su__input su__select"
                  value={formData.course}
                  onChange={handleChange}
                  disabled={isSending}
                >
                  <option>Intensive Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Chinese Language</option>
                </select>
              </div>

              <button type="submit" className="su__submit" disabled={isSending}>
                {isSending ? 'Sending...' : 'Yes, call me!'}
              </button>
            </form>

            <p className="su__offline-note">
              Classes are conducted offline in Tashkent, Fergana and Samarkand.
            </p>

            <button className="su__back" onClick={() => navigate(-1)}>
              ← Go back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}