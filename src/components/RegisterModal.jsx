import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const RegisterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'Intensive Beginner'
  });

  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSending(true);

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in all required fields');
      setIsSending(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      setIsSending(false);
      return;
    }

    // Phone validation (basic)
    if (formData.phone.length < 5) {
      setErrorMessage('Please enter a valid phone number');
      setIsSending(false);
      return;
    }

    // Replace these with your actual EmailJS credentials
    const SERVICE_ID = 'service_giayoc6'; 
    const TEMPLATE_ID = 'template_1b3ug2u';
    const PUBLIC_KEY = '5j3dR4oz_QORxuNJS';

    // Send the email
    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSuccessMessage(`Thank you ${formData.name}! Your application has been submitted. We will contact you shortly.`);
        
        // Clear form after successful submission
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', course: 'Intensive Beginner' });
          setIsSending(false);
          // Close modal after 3 seconds
          setTimeout(() => onClose(), 3000);
        }, 2000);
      })
      .catch((error) => {
        console.error('FAILED...', error);
        setErrorMessage('Unable to send application. Please contact us directly at info@stanton-academy.com or WhatsApp +60 1118648860');
        setIsSending(false);
      });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <h2>Join <span>Stanton Academy</span></h2>
          <p>Start your journey to fluency today!</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="success-message" style={{
            backgroundColor: '#d1fae5',
            color: '#065f46',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '20px',
            border: '1px solid #a7f3d0'
          }}>
            <strong>✓ Success!</strong> {successMessage}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="error-message" style={{
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '20px',
            border: '1px solid #fca5a5'
          }}>
            <strong>⚠️ Error:</strong> {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Full Name *</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              disabled={isSending}
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={isSending}
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input 
              type="tel" 
              placeholder="+60 12-345-6789" 
              required 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              disabled={isSending}
            />
          </div>

          <div className="form-group">
            <label>Select Course</label>
            <select 
              value={formData.course}
              onChange={(e) => setFormData({...formData, course: e.target.value})}
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
              backgroundColor: successMessage ? '#22c55e' : '#006B3F'
            }}
          >
            {isSending ? (
              <>
                <span style={{ marginRight: '8px' }}>⏳</span>
                Sending...
              </>
            ) : successMessage ? (
              <>
                <span style={{ marginRight: '8px' }}>✓</span>
                Submitted Successfully!
              </>
            ) : (
              'Submit Application'
            )}
          </button>

          <div style={{ 
            marginTop: '15px', 
            fontSize: '0.8rem', 
            color: '#666',
            textAlign: 'center'
          }}>
            <p>Having trouble? Contact us directly:</p>
            <p style={{ marginTop: '5px' }}>
              📞 +60 1118648860 | 📧 info@stanton-academy.com
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};

export default RegisterModal;