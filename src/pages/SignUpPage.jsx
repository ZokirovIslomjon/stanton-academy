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

  // Updated state to handle all the new form fields
  const [formData, setFormData] = useState({
    fullName: '',
    nationality: '',
    age: '',
    countryCode: '+60',
    phone: '',
    email: '',
    course: '',
    hearAbout: '',
    message: ''
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

    // Bundle all the new data into the message so it doesn't get lost, 
    // even if your EmailJS template hasn't been updated with the new variables yet.
    const fullMessageDetails = `
      New Application Received:
      Name: ${formData.fullName}
      Nationality: ${formData.nationality}
      Age: ${formData.age}
      Phone: ${formData.countryCode} ${formData.phone}
      Email: ${formData.email}
      Course: ${formData.course}
      Heard About Us: ${formData.hearAbout}
      Message: ${formData.message || 'No additional message provided.'}
    `;

    const templateParams = {
      to_name: 'Stanton Academy',
      from_name: formData.fullName,
      from_email: formData.email,
      phone: `${formData.countryCode} ${formData.phone}`,
      course: formData.course,
      message: fullMessageDetails,
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
        alert(`Thank you ${formData.fullName}! Your application has been submitted successfully. We will contact you shortly.`);
        
        // Google Ads Conversion Tracking
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'ads_conversion_Submit_lead_form_1', {
             'event_category': 'Lead Form',
             'event_label': formData.course 
          });
        }
        
        // Reset form
        setFormData({
          fullName: '', nationality: '', age: '', countryCode: '+60', phone: '', email: '', course: '', hearAbout: '', message: ''
        });
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
            padding: 100px 20px 60px; /* Added top padding to clear the logo */
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
            align-items: flex-start; /* Aligns items to the top since the form is tall */
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
            width: 100%;
            position: sticky;
            top: 100px; /* Makes the poster stick as you scroll down the form */
          }

          .slider-container {
            position: relative;
            width: 100%;
            max-width: 450px; 
            aspect-ratio: 4 / 5; 
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
            max-width: 500px; 
            width: 100%;
          }

          .signup-card {
            background: #ffffff;
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.2);
            text-align: left;
          }

          .signup-card h2 {
            font-size: 1.8rem;
            color: #1a1a1a;
            font-weight: 800;
            margin-bottom: 30px;
            line-height: 1.2;
            text-transform: uppercase;
          }

          /* NEW FORM STYLING BASED ON SCREENSHOT */
          .signup-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .form-row {
            display: flex;
            gap: 15px;
          }

          .form-col {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .form-label {
            font-size: 0.85rem;
            font-weight: 600;
            color: #374151;
            margin-bottom: 6px;
          }

          .form-label span {
            color: #ef4444; /* Red asterisk */
          }

          .form-control {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 0.95rem;
            color: #1a1a1a;
            background-color: #f9fafb;
            outline: none;
            transition: all 0.3s ease;
            font-family: inherit;
          }

          .form-control:focus {
            border-color: #006B3F;
            background-color: #ffffff;
            box-shadow: 0 0 0 3px rgba(0, 107, 63, 0.1);
          }

          select.form-control {
            cursor: pointer;
          }

          textarea.form-control {
            resize: vertical;
            min-height: 100px;
          }

          /* Phone Input Group */
          .phone-group {
            display: flex;
            gap: 10px;
          }
          .phone-group select {
            width: 40%;
          }
          .phone-group input {
            width: 60%;
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
            text-transform: uppercase;
          }

          .btn-call:hover:not(:disabled) {
            background-color: #00502f;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0, 107, 63, 0.2);
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
            width: 100%;
            text-align: center;
          }

          .btn-back:hover {
            color: #4b5563;
          }

          /* Mobile Responsiveness */
          @media (max-width: 900px) {
            .signup-container {
              flex-direction: column;
              align-items: center;
              gap: 40px;
            }
            .signup-left {
              position: static; /* Removes sticky behavior on phone */
            }
            .signup-logo {
              position: static;
              margin-bottom: 20px;
              display: block;
              margin: 0 auto 30px;
            }
            .signup-page-wrapper {
              padding-top: 30px;
              display: block;
            }
            .slider-container {
              max-width: 360px; 
            }
            .form-row {
              flex-direction: column;
              gap: 20px;
            }
            .signup-card {
              padding: 30px 20px;
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
            <h2>ENQUIRE NOW</h2>
            
            <form onSubmit={handleSubmit} className="signup-form">
              
              {/* Full Name */}
              <div className="form-col">
                <label className="form-label">Full Name (As in IC/ Passport)<span>*</span></label>
                <input 
                  type="text" 
                  required 
                  className="form-control"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  disabled={isSending}
                />
              </div>

              {/* Nationality & Age Row */}
              <div className="form-row">
                <div className="form-col">
                  <label className="form-label">Nationality<span>*</span></label>
                  <input 
                    type="text" 
                    placeholder="e.g. Malaysian"
                    required 
                    className="form-control"
                    value={formData.nationality}
                    onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                    disabled={isSending}
                  />
                </div>
                <div className="form-col">
                  <label className="form-label">Age<span>*</span></label>
                  <input 
                    type="number" 
                    required 
                    min="1"
                    max="100"
                    className="form-control"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    disabled={isSending}
                  />
                </div>
              </div>
              
              {/* Phone Number with Country Code */}
              <div className="form-col">
                <label className="form-label">Phone number<span>*</span></label>
                <div className="phone-group">
                  <select 
                    className="form-control" 
                    value={formData.countryCode} 
                    onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                    disabled={isSending}
                  >
                    <option value="+60">Malaysia (+60)</option>
                    <option value="+65">Singapore (+65)</option>
                    <option value="+62">Indonesia (+62)</option>
                    <option value="+66">Thailand (+66)</option>
                    <option value="+86">China (+86)</option>
                    <option value="+91">India (+91)</option>
                    <option value="+1">US/Canada (+1)</option>
                    <option value="+44">UK (+44)</option>
                    <option value="+971">UAE (+971)</option>
                    <option value="Other">Other</option>
                  </select>
                  <input 
                    type="tel" 
                    required 
                    className="form-control"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    disabled={isSending}
                  />
                </div>
              </div>
              
              {/* Email */}
              <div className="form-col">
                <label className="form-label">Email<span>*</span></label>
                <input 
                  type="email" 
                  required 
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={isSending}
                />
              </div>
              
              {/* Courses Selection */}
              <div className="form-col">
                <label className="form-label">Courses<span>*</span></label>
                <select 
                  required 
                  className="form-control"
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  disabled={isSending}
                >
                  <option value="" disabled hidden>Please Select</option>
                  <option value="General English">General English</option>
                  <option value="IELTS Preparation">IELTS Preparation</option>
                  <option value="Intensive Speaking English">Intensive Speaking English</option>
                  <option value="Business English">Business English</option>
                  <option value="Mandarin">Mandarin</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Korean">Korean</option>
                  <option value="Bahasa Malaysia">Bahasa Malaysia</option>
                  <option value="German">German</option>
                  <option value="Summer Camp">Summer Camp</option>
                </select>
              </div>

              {/* Hear About Us */}
              <div className="form-col">
                <label className="form-label">How did you hear about us?<span>*</span></label>
                <select 
                  required 
                  className="form-control"
                  value={formData.hearAbout}
                  onChange={(e) => setFormData({...formData, hearAbout: e.target.value})}
                  disabled={isSending}
                >
                  <option value="" disabled hidden>Please Select</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Social Media (Instagram/Facebook/TikTok)">Social Media</option>
                  <option value="Friends or Family">Friends or Family</option>
                  <option value="Agent or Agency">Agent or Agency</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="form-col">
                <label className="form-label">Any questions or messages for us?</label>
                <textarea 
                  className="form-control"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  disabled={isSending}
                  placeholder="Type your message here..."
                ></textarea>
              </div>

              <button type="submit" className="btn-call" disabled={isSending}>
                {isSending ? 'SENDING...' : 'SUBMIT ENQUIRY'}
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