import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

// ✅ Initialize EmailJS once at the top of the file (outside the component)
emailjs.init('5j3dR4oz_QORxuNJS');

const EMAILJS_SERVICE_ID  = 'service_giayoc6';
const EMAILJS_TEMPLATE_ID = 'template_1b3ug2u';
const EMAILJS_PUBLIC_KEY  = '5j3dR4oz_QORxuNJS';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'Intensive Beginner'
  });

  const [isSending, setIsSending]     = useState(false);
  const [errorMessage, setErrorMessage]   = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSending(true);

    const templateParams = {
      to_name:    'Stanton Academy',
      from_name:  formData.name,
      from_email: formData.email,
      phone:      formData.phone,
      course:     formData.course,
      message:    `New application from ${formData.name} for the ${formData.course} course.`,
      reply_to:   formData.email,
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setSuccessMessage(
          `Thank you, ${formData.name}! Your application was submitted successfully. We will contact you shortly.`
        );
        setFormData({ name: '', email: '', phone: '', course: 'Intensive Beginner' });
        setIsSending(false);
        // Redirect back to home after 3 seconds
        setTimeout(() => navigate('/'), 3000);
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setErrorMessage(
          'Failed to send your application. Please try again or contact us directly at info@stanton-academy.com'
        );
        setIsSending(false);
      });
  };

  return (
    <div
      className="signup-page"
      style={{ paddingTop: '120px', minHeight: '100vh', background: '#f9fdfb' }}
    >
      <div className="container">
        <div
          className="signup-form-container"
          style={{
            maxWidth: '500px',
            margin: '0 auto',
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          }}
        >
          <div className="modal-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2>
              Join <span style={{ color: '#006B3F' }}>Stanton Academy</span>
            </h2>
            <p>Start your journey to fluency today!</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div
              style={{
                backgroundColor: '#d1fae5',
                color: '#065f46',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '20px',
                border: '1px solid #a7f3d0',
              }}
            >
              <strong>✓ Success!</strong> {successMessage}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div
              style={{
                backgroundColor: '#fee2e2',
                color: '#991b1b',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '20px',
                border: '1px solid #fca5a5',
              }}
            >
              <strong>⚠️ Error:</strong> {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={isSending}
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isSending}
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                placeholder="+60 12-345-6789"
                required
                value={formData.phone}
                onChange={handleChange}
                disabled={isSending}
              />
            </div>

            <div className="form-group">
              <label>Select Course</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                disabled={isSending}
              >
                <option value="Intensive Beginner">Intensive Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Chinese Language">Chinese Language</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn-submit"
              disabled={isSending}
              style={{
                opacity: isSending ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              {isSending ? 'Sending...' : 'Submit Application'}
            </button>

            {/* WhatsApp Alternative */}
            <div
              style={{
                marginTop: '20px',
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '10px',
                textAlign: 'center',
                border: '1px solid #e5e7eb',
              }}
            >
              <p style={{ marginBottom: '10px', color: '#666' }}>
                <strong>Alternative:</strong> Contact us directly on WhatsApp
              </p>
              <a
                href={`https://wa.me/601118648860?text=Hello! I'm interested in joining Stanton Academy. My name is ${formData.name || ''} and I'm interested in the ${formData.course} course.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#25D366',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '600',
                }}
              >
                📱 Contact on WhatsApp
              </a>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => navigate(-1)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#006B3F',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                ← Go Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
