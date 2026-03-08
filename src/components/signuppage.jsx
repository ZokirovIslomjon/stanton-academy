import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const SignUpPage = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSending(true);

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in all required fields');
      setIsSending(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      setIsSending(false);
      return;
    }

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
        setSuccessMessage(`Thank you ${formData.name}! Your application has been submitted successfully. We will contact you shortly.`);
        setFormData({ name: '', email: '', phone: '', course: 'Intensive Beginner' });
        setIsSending(false);
        setTimeout(() => navigate('/'), 3000);
      })
      .catch((error) => {
        console.error('EmailJS Error Details:', error);
        setErrorMessage('Failed to send application. Please try again or contact us directly.');
        setIsSending(false);
      });
  };

  return (
    <div className="signup-page" style={{ paddingTop: '120px', minHeight: '100vh', background: '#f9fdfb' }}>
      <div className="container">
        <div className="signup-form-container" style={{ maxWidth: '500px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
          <div className="modal-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2>Join <span style={{ color: '#006B3F' }}>Stanton Academy</span></h2>
            <p>Start your journey to fluency today!</p>
          </div>

          {successMessage && (
            <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '15px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #a7f3d0' }}>
              <strong>✓ Success!</strong> {successMessage}
            </div>
          )}

          {errorMessage && (
            <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '15px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #fca5a5' }}>
              <strong>⚠️ Error:</strong> {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" placeholder="Enter your name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} disabled={isSending} />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" placeholder="name@example.com" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} disabled={isSending} />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" placeholder="+60 12-345-6789" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} disabled={isSending} />
            </div>

            <div className="form-group">
              <label>Select Course</label>
              <select value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} disabled={isSending}>
                <option value="Intensive Beginner">Intensive Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Chinese Language">Chinese Language</option>
              </select>
            </div>

            <button type="submit" className="btn-submit" disabled={isSending} style={{ opacity: isSending ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              {isSending ? 'Sending...' : 'Submit Application'}
            </button>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button type="button" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#006B3F', cursor: 'pointer', textDecoration: 'underline' }}>
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