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

  // Test EmailJS connection function
  const testEmailJSConnection = () => {
    console.log('Testing EmailJS Connection...');
    console.log('Service ID:', 'service_giayoc6');
    console.log('Template ID:', 'template_1b3ug2u');
    console.log('Public Key:', '5j3dR4oz_QORxuNJS');
    
    // Test if EmailJS is loaded
    if (window.emailjs) {
      console.log('EmailJS is loaded successfully');
      console.log('EmailJS version:', emailjs.version);
    } else {
      console.error('EmailJS is NOT loaded');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSending(true);

    // Test connection first
    testEmailJSConnection();

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

    // Prepare template parameters
    const templateParams = {
      to_name: 'Stanton Academy', // Your name/company
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      course: formData.course,
      message: `New application from ${formData.name} for ${formData.course} course`,
      reply_to: formData.email
    };

    console.log('Sending with params:', templateParams);

    // Send the email
    emailjs.send(
      'service_giayoc6', 
      'template_1b3ug2u', 
      templateParams, 
      '5j3dR4oz_QORxuNJS'
    )
      .then((response) => {
        console.log('SUCCESS!', response);
        setSuccessMessage(`Thank you ${formData.name}! Your application has been submitted successfully. We will contact you shortly.`);
        
        // Clear form
        setFormData({ name: '', email: '', phone: '', course: 'Intensive Beginner' });
        setIsSending(false);
        
        // Auto-close after 5 seconds
        setTimeout(() => {
          onClose();
        }, 5000);
      })
      .catch((error) => {
        console.error('EmailJS Error Details:', error);
        
        // More specific error messages
        if (error.text && error.text.includes('Invalid')) {
          setErrorMessage('Invalid EmailJS configuration. Please check your Service ID and Template ID.');
        } else if (error.text && error.text.includes('Key')) {
          setErrorMessage('Invalid Public Key. Please check your EmailJS API key.');
        } else {
          setErrorMessage('Failed to send application. Please contact us directly at info@stanton-academy.com');
        }
        
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
            border: '1px solid #a7f3d0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '1.5rem' }}>✓</span>
            <div>
              <strong>Success!</strong> {successMessage}
            </div>
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
            border: '1px solid #fca5a5',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '1.5rem' }}>⚠️</span>
            <div>
              <strong>Unable to send</strong> {errorMessage}
            </div>
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
              backgroundColor: successMessage ? '#22c55e' : '#006B3F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            {isSending ? (
              <>
                <span className="spinner"></span>
                Sending Application...
              </>
            ) : successMessage ? (
              'Submitted Successfully!'
            ) : (
              'Submit Application'
            )}
          </button>

          {/* WhatsApp Alternative */}
          <div style={{ 
            marginTop: '20px', 
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            textAlign: 'center',
            border: '1px solid #e5e7eb'
          }}>
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
                marginTop: '10px'
              }}
            >
              📱 Contact on WhatsApp
            </a>
          </div>
        </form>

      </div>
    </div>
  );
};

export default RegisterModal;