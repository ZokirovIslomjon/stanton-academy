import React, { useState } from 'react';
import Location from '../components/Location';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const sheetData = {
      data: [{
          Name: formData.name, Nationality: 'N/A', Age: 'N/A', 
          Phone: `'${formData.phone}`, Email: formData.email,
          Course: formData.subject, HearAbout: 'Contact Page',
          Message: formData.message, Date: new Date().toLocaleString()
      }]
    };

    try {
      const response = await fetch('https://sheetdb.io/api/v1/k5ohu0497ek0x', {
        method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetData)
      });
      if (response.ok) setIsSubmitted(true);
      else throw new Error('Network error');
    } catch (error) {
      alert('Failed to send message. Please contact us directly on WhatsApp.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="contact-page-wrapper">
      <style>{`
        .contact-page-wrapper { overflow-x: hidden; background-color: #f9fafb; }
        
        .contact-hero {
          position: relative;
          padding: 160px 20px 60px;
          text-align: center;
          background-color: #ffffff;
          overflow: hidden;
          z-index: 1;
        }

        /* MASSIVE GREEN BLOB ON TOP LEFT */
        .contact-hero::before {
          content: ''; position: absolute; top: -20vw; left: -20vw; width: 80vw; height: 80vw;
          background: radial-gradient(circle, rgba(0, 107, 63, 0.12) 0%, transparent 65%);
          z-index: -1; pointer-events: none;
        }

        /* MASSIVE YELLOW BLOB ON RIGHT */
        .contact-hero::after {
          content: ''; position: absolute; top: -10vw; right: -20vw; width: 80vw; height: 80vw;
          background: radial-gradient(circle, rgba(255, 199, 44, 0.12) 0%, transparent 65%);
          z-index: -1; pointer-events: none;
        }

        .contact-hero h1 { font-size: clamp(3rem, 6vw, 4.5rem); font-weight: 800; line-height: 1.1; margin-bottom: 20px; }
        .contact-hero p { color: #6b7280; font-size: 1.1rem; max-width: 600px; margin: 0 auto; }

        .contact-form-section { padding: 20px 20px 60px; position: relative; z-index: 2; }
        .contact-card { max-width: 800px; margin: 0 auto; background: #ffffff; padding: 50px 40px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.06); border: 1px solid #f3f4f6; }
        .form-label { display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 0.9rem; }
        .form-input { width: 100%; padding: 14px 16px; border-radius: 10px; border: 2px solid #e5e7eb; outline: none; font-size: 1rem; background-color: #f9fafb; font-family: inherit; transition: border 0.3s, background-color 0.3s; }
        .form-input:focus { border-color: #006B3F; background-color: #ffffff; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .btn-submit { width: 100%; background-color: #006B3F; color: #ffffff; padding: 16px; border-radius: 10px; border: none; font-size: 1.1rem; font-weight: 800; text-transform: uppercase; cursor: pointer; transition: all 0.3s ease; }
        .btn-submit:hover:not(:disabled) { background-color: #00502f; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0, 107, 63, 0.2); }
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } .contact-hero { padding: 140px 20px 60px; } .contact-card { padding: 30px 20px; } }
      `}</style>

      <section className="contact-hero">
        <h1><span style={{ color: '#006B3F' }}>Contact</span> <span style={{ color: '#FFC72C' }}>Us</span></h1>
        <p>Have a question about our courses or need help with your application? Send us a message and our team will get back to you shortly.</p>
      </section>

      <section className="contact-form-section">
        <div className="contact-card">
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h2 style={{ color: '#1a1a1a', fontSize: '1.8rem', fontWeight: '800', margin: '15px 0' }}>Message Sent!</h2>
              <p style={{ color: '#4b5563', marginBottom: '30px' }}>Thank you, {formData.name}. We have received your message.</p>
              <button onClick={() => setIsSubmitted(false)} className="btn-submit" style={{ maxWidth: '250px' }}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form-grid">
              <div style={{ gridColumn: '1 / -1' }}><label className="form-label">Full Name*</label><input type="text" required className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} disabled={isSending} /></div>
              <div><label className="form-label">Email Address*</label><input type="email" required className="form-input" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} disabled={isSending} /></div>
              <div><label className="form-label">Phone Number*</label><input type="tel" required className="form-input" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} disabled={isSending} /></div>
              <div style={{ gridColumn: '1 / -1' }}><label className="form-label">Subject</label><input type="text" className="form-input" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} disabled={isSending} /></div>
              <div style={{ gridColumn: '1 / -1' }}><label className="form-label">Your Message*</label><textarea required className="form-input" style={{ minHeight: '120px', resize: 'vertical' }} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} disabled={isSending}></textarea></div>
              <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}><button type="submit" disabled={isSending} className="btn-submit">{isSending ? 'SENDING...' : 'SEND MESSAGE'}</button></div>
            </form>
          )}
        </div>
      </section>

      <div style={{ backgroundColor: '#ffffff', paddingBottom: '60px' }}>
        <Location />
      </div>
    </main>
  );
};

export default ContactPage;