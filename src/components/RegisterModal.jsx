import React, { useState } from 'react';
import emailjs from '@emailjs/browser'; // Import the email service

const RegisterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'Intensive Beginner'
  });

  // State to disable button while sending
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true); // Disable button

    // 👇 REPLACE THESE WITH YOUR REAL EMAILJS ID's
    const SERVICE_ID = 'service_giayoc6'; 
    const TEMPLATE_ID = 'template_1b3ug2u';
    const PUBLIC_KEY = '5j3dR4oz_QORxuNJS';

    // Send the email
    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then((response) => {
        // Success!
        alert(`Success! Application sent for ${formData.name}. We will contact you shortly.`);
        setFormData({ name: '', email: '', phone: '', course: 'Intensive Beginner' }); // Clear form
        onClose(); // Close modal
        setIsSending(false); // Re-enable button
      })
      .catch((error) => {
        // Error
        console.error('FAILED...', error);
        alert('Failed to send application. Please try again or contact us on WhatsApp.');
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

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              placeholder="+60 12-345-6789" 
              required 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Select Course</label>
            <select 
              value={formData.course}
              onChange={(e) => setFormData({...formData, course: e.target.value})}
            >
              <option>Intensive Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Chinese Language</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="btn-submit" 
            disabled={isSending} // Disable if currently sending
            style={{ opacity: isSending ? 0.7 : 1 }}
          >
            {isSending ? 'Sending...' : 'Submit Application'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default RegisterModal;