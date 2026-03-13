import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

emailjs.init('5j3dR4oz_QORxuNJS');

const EMAILJS_SERVICE_ID  = 'service_giayoc6';
const EMAILJS_TEMPLATE_ID = 'template_1b3ug2u';
const EMAILJS_PUBLIC_KEY  = '5j3dR4oz_QORxuNJS';

// All classes are prefixed with "su__" to avoid conflicts with index.css
const styles = `
  /* ── Font loading via link tag (done in useEffect) ── */

  .su__root {
    min-height: 100vh;
    background: #0a0f1e;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
    padding: 40px 20px;
    box-sizing: border-box;
  }

  .su__root::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(0, 107, 63, 0.25) 0%, transparent 70%);
    top: -100px;
    left: -100px;
    border-radius: 50%;
    animation: su__blobMove 8s ease-in-out infinite alternate;
  }

  .su__root::after {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(0, 180, 100, 0.15) 0%, transparent 70%);
    bottom: -100px;
    right: -100px;
    border-radius: 50%;
    animation: su__blobMove 10s ease-in-out infinite alternate-reverse;
  }

  @keyframes su__blobMove {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(40px, 30px) scale(1.1); }
  }

  .su__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 1000px;
    width: 100%;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
    position: relative;
    z-index: 1;
    animation: su__fadeUp 0.7s ease both;
  }

  @keyframes su__fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Left panel ── */
  .su__left {
    background: linear-gradient(145deg, #0d1f14 0%, #0a1a10 50%, #061209 100%);
    padding: 60px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
    border-right: 1px solid rgba(0, 107, 63, 0.2);
    box-sizing: border-box;
  }

  .su__left::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23006B3F' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.4;
    pointer-events: none;
  }

  .su__badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(0, 107, 63, 0.2);
    border: 1px solid rgba(0, 107, 63, 0.4);
    color: #4ade80;
    padding: 6px 14px;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin: 0 0 28px 0;
    width: fit-content;
    position: relative;
  }

  .su__badge-dot {
    width: 6px;
    height: 6px;
    background: #4ade80;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
    animation: su__pulse 2s infinite;
  }

  @keyframes su__pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(1.4); }
  }

  .su__heading {
    font-family: 'Syne', sans-serif;
    font-size: 2.4rem;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.15;
    margin: 0 0 20px 0;
    padding: 0;
    position: relative;
  }

  .su__heading-accent {
    font-style: normal;
    color: #4ade80;
  }

  .su__subtext {
    color: rgba(255,255,255,0.5);
    font-size: 0.92rem;
    line-height: 1.7;
    margin: 0 0 36px 0;
    padding: 0;
    position: relative;
  }

  .su__features {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
    position: relative;
  }

  .su__features li {
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(255,255,255,0.7);
    font-size: 0.88rem;
    margin: 0;
    padding: 0;
  }

  .su__check {
    width: 22px;
    height: 22px;
    min-width: 22px;
    background: rgba(0, 107, 63, 0.3);
    border: 1px solid rgba(74, 222, 128, 0.4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4ade80;
    font-size: 0.7rem;
  }

  /* ── Right panel ── */
  .su__right {
    background: #ffffff;
    padding: 55px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
  }

  .su__form-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #0a0f1e;
    margin: 0 0 6px 0;
    padding: 0;
  }

  .su__form-sub {
    color: #6b7280;
    font-size: 0.88rem;
    margin: 0 0 28px 0;
    padding: 0;
  }

  .su__field {
    margin-bottom: 16px;
  }

  .su__field label {
    display: block;
    font-size: 0.75rem;
    font-weight: 500;
    color: #374151;
    margin: 0 0 6px 0;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  /* inputs and select share base styles */
  .su__input {
    width: 100%;
    padding: 13px 16px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-size: 0.93rem;
    font-family: 'DM Sans', sans-serif;
    color: #111827;
    background-color: #f9fafb;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
    outline: none;
    box-sizing: border-box;
    -webkit-appearance: none;
    appearance: none;
    display: block;
  }

  .su__input:focus {
    border-color: #006B3F;
    background-color: #ffffff;
    box-shadow: 0 0 0 4px rgba(0, 107, 63, 0.08);
  }

  .su__input::placeholder { color: #9ca3af; }

  /* select gets extra arrow */
  .su__select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    background-color: #f9fafb;
    padding-right: 40px;
    cursor: pointer;
  }

  .su__select:focus {
    background-color: #ffffff;
  }

  .su__submit {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #006B3F 0%, #008f54 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-family: 'Syne', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    margin-top: 6px;
    letter-spacing: 0.02em;
    box-sizing: border-box;
  }

  .su__submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 107, 63, 0.4);
  }

  .su__submit:active:not(:disabled) { transform: translateY(0); }
  .su__submit:disabled { opacity: 0.6; cursor: not-allowed; }

  .su__or-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 16px;
  }

  .su__or-line { flex: 1; height: 1px; background: #e5e7eb; }
  .su__or-text { font-size: 0.75rem; color: #9ca3af; white-space: nowrap; }

  .su__wa-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 12px 16px;
    background-color: #f0fdf4;
    border: 1.5px solid #bbf7d0;
    border-radius: 10px;
    color: #15803d;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    margin-top: 12px;
    transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
    box-sizing: border-box;
  }

  .su__wa-btn:hover {
    background-color: #dcfce7;
    border-color: #86efac;
    transform: translateY(-1px);
    color: #15803d;
    text-decoration: none;
  }

  .su__back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    color: #9ca3af;
    font-size: 0.82rem;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    margin-top: 14px;
    padding: 0;
    transition: color 0.2s;
  }

  .su__back:hover { color: #006B3F; }

  .su__alert {
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 0.85rem;
    margin: 0 0 16px 0;
    line-height: 1.5;
    box-sizing: border-box;
  }

  .su__alert--success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d; }
  .su__alert--error   { background: #fff1f2; border: 1px solid #fecdd3; color: #be123c; }

  @media (max-width: 700px) {
    .su__grid  { grid-template-columns: 1fr; border-radius: 20px; }
    .su__left  { padding: 40px 30px; border-right: none; border-bottom: 1px solid rgba(0,107,63,0.2); }
    .su__heading { font-size: 1.9rem; }
    .su__right { padding: 40px 30px; }
  }
`;

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: 'Intensive Beginner' });
  const [isSending, setIsSending]           = useState(false);
  const [errorMessage, setErrorMessage]     = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // ✅ Load Google Fonts properly via a <link> tag (not @import in injected <style>)
  useEffect(() => {
    const id = 'su-google-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id   = id;
      link.rel  = 'stylesheet';
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
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_name:    'Stanton Academy',
      from_name:  formData.name,
      from_email: formData.email,
      phone:      formData.phone,
      course:     formData.course,
      message:    `New application from ${formData.name} for the ${formData.course} course.`,
      reply_to:   formData.email,
    }, EMAILJS_PUBLIC_KEY)
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

          {/* ── Left panel ── */}
          <div className="su__left">
            <div className="su__badge">
              <span className="su__badge-dot"></span>
              Now enrolling
            </div>
            <h1 className="su__heading">
              We don't just teach English,{' '}
              <span className="su__heading-accent">we change lives.</span>
            </h1>
            <p className="su__subtext">
              Join thousands of students who've transformed their futures with Stanton Academy's world-class curriculum.
            </p>
            <ul className="su__features">
              {[
                'Free first lesson — no commitment',
                'Small groups for personal attention',
                'Native-level fluency guaranteed',
                'Flexible schedules for busy people',
              ].map((item) => (
                <li key={item}>
                  <span className="su__check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right panel ── */}
          <div className="su__right">
            <h2 className="su__form-title">Register for your first lesson</h2>
            <p className="su__form-sub">Fill in the form and we'll contact you shortly.</p>

            {successMessage && (
              <div className="su__alert su__alert--success">✓ &nbsp;{successMessage}</div>
            )}
            {errorMessage && (
              <div className="su__alert su__alert--error">⚠️ &nbsp;{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="su__field">
                <label htmlFor="su-name">Full Name *</label>
                <input id="su-name" className="su__input" name="name" type="text"
                  placeholder="Your full name" value={formData.name}
                  onChange={handleChange} disabled={isSending} required />
              </div>
              <div className="su__field">
                <label htmlFor="su-email">Email Address *</label>
                <input id="su-email" className="su__input" name="email" type="email"
                  placeholder="name@example.com" value={formData.email}
                  onChange={handleChange} disabled={isSending} required />
              </div>
              <div className="su__field">
                <label htmlFor="su-phone">Phone Number *</label>
                <input id="su-phone" className="su__input" name="phone" type="tel"
                  placeholder="+60 12-345-6789" value={formData.phone}
                  onChange={handleChange} disabled={isSending} required />
              </div>
              <div className="su__field">
                <label htmlFor="su-course">Select Course</label>
                <select id="su-course" className="su__input su__select" name="course"
                  value={formData.course} onChange={handleChange} disabled={isSending}>
                  <option>Intensive Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Chinese Language</option>
                </select>
              </div>
              <button type="submit" className="su__submit" disabled={isSending}>
                {isSending ? 'Sending…' : 'Sign up for the first lesson ✨'}
              </button>
            </form>

            <div className="su__or-row">
              <div className="su__or-line"></div>
              <span className="su__or-text">or contact directly</span>
              <div className="su__or-line"></div>
            </div>

            <a className="su__wa-btn"
              href={`https://wa.me/601118648860?text=Hello! I'm interested in the ${formData.course} course.`}
              target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contact on WhatsApp
            </a>

            <button className="su__back" onClick={() => navigate(-1)}>← Go back</button>
          </div>

        </div>
      </div>
    </>
  );
}
