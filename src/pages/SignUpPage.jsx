import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import logo from '../assets/logo-new.png'; 

import poster1 from '../assets/poster1.jpeg';
import poster2 from '../assets/poster2.png';

// Complete list of world country calling codes
const countryCodes = [
  { name: 'Afghanistan', code: '+93' }, { name: 'Albania', code: '+355' }, { name: 'Algeria', code: '+213' }, { name: 'Andorra', code: '+376' }, { name: 'Angola', code: '+244' },
  { name: 'Antigua & Barbuda', code: '+1-268' }, { name: 'Argentina', code: '+54' }, { name: 'Armenia', code: '+374' }, { name: 'Australia', code: '+61' }, { name: 'Austria', code: '+43' },
  { name: 'Azerbaijan', code: '+994' }, { name: 'Bahamas', code: '+1-242' }, { name: 'Bahrain', code: '+973' }, { name: 'Bangladesh', code: '+880' }, { name: 'Barbados', code: '+1-246' },
  { name: 'Belarus', code: '+375' }, { name: 'Belgium', code: '+32' }, { name: 'Belize', code: '+501' }, { name: 'Benin', code: '+229' }, { name: 'Bhutan', code: '+975' },
  { name: 'Bolivia', code: '+591' }, { name: 'Bosnia & Herzegovina', code: '+387' }, { name: 'Botswana', code: '+267' }, { name: 'Brazil', code: '+55' }, { name: 'Brunei', code: '+673' },
  { name: 'Bulgaria', code: '+359' }, { name: 'Burkina Faso', code: '+226' }, { name: 'Burundi', code: '+257' }, { name: 'Cambodia', code: '+855' }, { name: 'Cameroon', code: '+237' },
  { name: 'Canada', code: '+1' }, { name: 'Cape Verde', code: '+238' }, { name: 'Central African Republic', code: '+236' }, { name: 'Chad', code: '+235' }, { name: 'Chile', code: '+56' },
  { name: 'China', code: '+86' }, { name: 'Colombia', code: '+57' }, { name: 'Comoros', code: '+269' }, { name: 'Congo', code: '+242' }, { name: 'Costa Rica', code: '+506' },
  { name: 'Croatia', code: '+385' }, { name: 'Cuba', code: '+53' }, { name: 'Cyprus', code: '+357' }, { name: 'Czech Republic', code: '+420' }, { name: 'Denmark', code: '+45' },
  { name: 'Djibouti', code: '+253' }, { name: 'Dominica', code: '+1-767' }, { name: 'Dominican Republic', code: '+1-809' }, { name: 'Ecuador', code: '+593' }, { name: 'Egypt', code: '+20' },
  { name: 'El Salvador', code: '+503' }, { name: 'Equatorial Guinea', code: '+240' }, { name: 'Eritrea', code: '+291' }, { name: 'Estonia', code: '+372' }, { name: 'Eswatini', code: '+268' },
  { name: 'Ethiopia', code: '+251' }, { name: 'Fiji', code: '+679' }, { name: 'Finland', code: '+358' }, { name: 'France', code: '+33' }, { name: 'Gabon', code: '+241' },
  { name: 'Gambia', code: '+220' }, { name: 'Georgia', code: '+995' }, { name: 'Germany', code: '+49' }, { name: 'Ghana', code: '+233' }, { name: 'Greece', code: '+30' },
  { name: 'Grenada', code: '+1-473' }, { name: 'Guatemala', code: '+502' }, { name: 'Guinea', code: '+224' }, { name: 'Guinea-Bissau', code: '+245' }, { name: 'Guyana', code: '+592' },
  { name: 'Haiti', code: '+509' }, { name: 'Honduras', code: '+504' }, { name: 'Hungary', code: '+36' }, { name: 'Iceland', code: '+354' }, { name: 'India', code: '+91' },
  { name: 'Indonesia', code: '+62' }, { name: 'Iran', code: '+98' }, { name: 'Iraq', code: '+964' }, { name: 'Ireland', code: '+353' }, { name: 'Israel', code: '+972' },
  { name: 'Italy', code: '+39' }, { name: 'Jamaica', code: '+1-876' }, { name: 'Japan', code: '+81' }, { name: 'Jordan', code: '+962' }, { name: 'Kazakhstan', code: '+7' },
  { name: 'Kenya', code: '+254' }, { name: 'Kiribati', code: '+686' }, { name: 'Kuwait', code: '+965' }, { name: 'Kyrgyzstan', code: '+996' }, { name: 'Laos', code: '+856' },
  { name: 'Latvia', code: '+371' }, { name: 'Lebanon', code: '+961' }, { name: 'Lesotho', code: '+266' }, { name: 'Liberia', code: '+231' }, { name: 'Libya', code: '+218' },
  { name: 'Liechtenstein', code: '+423' }, { name: 'Lithuania', code: '+370' }, { name: 'Luxembourg', code: '+352' }, { name: 'Madagascar', code: '+261' }, { name: 'Malawi', code: '+265' },
  { name: 'Malaysia', code: '+60' }, { name: 'Maldives', code: '+960' }, { name: 'Mali', code: '+223' }, { name: 'Malta', code: '+356' }, { name: 'Marshall Islands', code: '+692' },
  { name: 'Mauritania', code: '+222' }, { name: 'Mauritius', code: '+230' }, { name: 'Mexico', code: '+52' }, { name: 'Micronesia', code: '+691' }, { name: 'Moldova', code: '+373' },
  { name: 'Monaco', code: '+377' }, { name: 'Mongolia', code: '+976' }, { name: 'Montenegro', code: '+382' }, { name: 'Morocco', code: '+212' }, { name: 'Mozambique', code: '+258' },
  { name: 'Myanmar', code: '+95' }, { name: 'Namibia', code: '+264' }, { name: 'Nauru', code: '+674' }, { name: 'Nepal', code: '+977' }, { name: 'Netherlands', code: '+31' },
  { name: 'New Zealand', code: '+64' }, { name: 'Nicaragua', code: '+505' }, { name: 'Niger', code: '+227' }, { name: 'Nigeria', code: '+234' }, { name: 'North Korea', code: '+850' },
  { name: 'North Macedonia', code: '+389' }, { name: 'Norway', code: '+47' }, { name: 'Oman', code: '+968' }, { name: 'Pakistan', code: '+92' }, { name: 'Palau', code: '+680' },
  { name: 'Palestine', code: '+970' }, { name: 'Panama', code: '+507' }, { name: 'Papua New Guinea', code: '+675' }, { name: 'Paraguay', code: '+595' }, { name: 'Peru', code: '+51' },
  { name: 'Philippines', code: '+63' }, { name: 'Poland', code: '+48' }, { name: 'Portugal', code: '+351' }, { name: 'Qatar', code: '+974' }, { name: 'Romania', code: '+40' },
  { name: 'Russia', code: '+7' }, { name: 'Rwanda', code: '+250' }, { name: 'St. Kitts & Nevis', code: '+1-869' }, { name: 'St. Lucia', code: '+1-758' }, { name: 'St. Vincent & Grenadines', code: '+1-784' },
  { name: 'Samoa', code: '+685' }, { name: 'San Marino', code: '+378' }, { name: 'Sao Tome & Principe', code: '+239' }, { name: 'Saudi Arabia', code: '+966' }, { name: 'Senegal', code: '+221' },
  { name: 'Serbia', code: '+381' }, { name: 'Seychelles', code: '+248' }, { name: 'Sierra Leone', code: '+232' }, { name: 'Singapore', code: '+65' }, { name: 'Slovakia', code: '+421' },
  { name: 'Slovenia', code: '+386' }, { name: 'Solomon Islands', code: '+677' }, { name: 'Somalia', code: '+252' }, { name: 'South Africa', code: '+27' }, { name: 'South Korea', code: '+82' },
  { name: 'South Sudan', code: '+211' }, { name: 'Spain', code: '+34' }, { name: 'Sri Lanka', code: '+94' }, { name: 'Sudan', code: '+249' }, { name: 'Suriname', code: '+597' },
  { name: 'Sweden', code: '+46' }, { name: 'Switzerland', code: '+41' }, { name: 'Syria', code: '+963' }, { name: 'Taiwan', code: '+886' }, { name: 'Tajikistan', code: '+992' },
  { name: 'Tanzania', code: '+255' }, { name: 'Thailand', code: '+66' }, { name: 'Timor-Leste', code: '+670' }, { name: 'Togo', code: '+228' }, { name: 'Tonga', code: '+676' },
  { name: 'Trinidad & Tobago', code: '+1-868' }, { name: 'Tunisia', code: '+216' }, { name: 'Turkey', code: '+90' }, { name: 'Turkmenistan', code: '+993' }, { name: 'Tuvalu', code: '+688' },
  { name: 'Uganda', code: '+256' }, { name: 'Ukraine', code: '+380' }, { name: 'United Arab Emirates', code: '+971' }, { name: 'United Kingdom', code: '+44' }, { name: 'United States', code: '+1' },
  { name: 'Uruguay', code: '+598' }, { name: 'Uzbekistan', code: '+998' }, { name: 'Vanuatu', code: '+678' }, { name: 'Vatican City', code: '+379' }, { name: 'Venezuela', code: '+58' },
  { name: 'Vietnam', code: '+84' }, { name: 'Yemen', code: '+967' }, { name: 'Zambia', code: '+260' }, { name: 'Zimbabwe', code: '+263' }
];

const SignUpPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const sliderImages = [poster1, poster2];

  const [formData, setFormData] = useState({
    fullName: '',
    nationality: '',
    age: '',
    countryCode: '+60',
    phone: '',
    email: '',
    course: '',
    hearAbout: '',
    hearAboutOther: '',
    message: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const finalHearAbout = formData.hearAbout === 'Other' ? `Other: ${formData.hearAboutOther}` : formData.hearAbout;

    const fullMessageDetails = `
      New Application Received:
      Name: ${formData.fullName}
      Nationality: ${formData.nationality}
      Age: ${formData.age}
      Phone: ${formData.countryCode} ${formData.phone}
      Email: ${formData.email}
      Course: ${formData.course}
      Heard About Us: ${finalHearAbout}
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
        
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'ads_conversion_Submit_lead_form_1', {
             'event_category': 'Lead Form',
             'event_label': formData.course 
          });
        }
        
        setFormData({
          fullName: '', nationality: '', age: '', countryCode: '+60', phone: '', email: '', course: '', hearAbout: '', hearAboutOther: '', message: ''
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
            padding: 100px 20px 60px; 
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
            align-items: flex-start; 
            justify-content: center;
            gap: 60px;
            max-width: 1200px; /* Made slightly wider to comfortably fit the compact form */
            width: 100%;
          }

          .signup-left {
            flex: 1;
            display: flex;
            justify-content: center;
            width: 100%;
            position: sticky;
            top: 100px; 
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

          .signup-right {
            flex: 1.2; /* Gives the form slightly more room so it isn't cramped */
            max-width: 600px; /* Wider card to fit side-by-side elements gracefully */
            width: 100%;
          }

          .signup-card {
            background: #ffffff;
            border-radius: 16px; /* Slightly sharper corners */
            padding: 35px 40px; /* Reduced padding slightly to save height */
            box-shadow: 0 25px 50px rgba(0,0,0,0.2);
            text-align: left;
          }

          .signup-card h2 {
            font-size: 1.7rem;
            color: #333333;
            font-weight: 800;
            margin-bottom: 25px;
            line-height: 1.2;
            text-transform: uppercase;
          }

          .signup-form {
            display: flex;
            flex-direction: column;
            gap: 15px; /* Tighter gap between rows */
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
            font-size: 0.8rem; /* Smaller, neater labels */
            font-weight: 600;
            color: #374151;
            margin-bottom: 4px; /* Tighter gap below label */
          }

          .form-label span {
            color: #ef4444; 
          }

          .form-control {
            width: 100%;
            padding: 10px 12px; /* Thinner inputs */
            border: 1px solid #d1d5db;
            border-radius: 4px; /* Sharper borders like the screenshot */
            font-size: 0.9rem;
            color: #1a1a1a;
            background-color: #f9fafb; /* Light grayish blue background */
            outline: none;
            transition: all 0.2s ease;
            font-family: inherit;
          }

          .form-control:focus {
            border-color: #006B3F;
            background-color: #ffffff;
            box-shadow: 0 0 0 2px rgba(0, 107, 63, 0.1);
          }

          select.form-control {
            cursor: pointer;
          }

          textarea.form-control {
            resize: vertical;
            min-height: 70px; /* Shorter message box */
          }

          .phone-group {
            display: flex;
            gap: 8px;
          }
          .phone-group select {
            width: 45%;
          }
          .phone-group input {
            width: 55%;
          }

          .btn-call {
            background-color: #006B3F;
            color: #ffffff;
            border: none;
            padding: 14px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 1.05rem;
            margin-top: 10px;
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
            font-size: 0.9rem;
            margin-top: 15px;
            cursor: pointer;
            transition: color 0.3s;
            width: 100%;
            text-align: center;
          }

          .btn-back:hover {
            color: #4b5563;
          }

          .fade-in {
            animation: fadeIn 0.3s ease-in-out;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media (max-width: 900px) {
            .signup-container {
              flex-direction: column;
              align-items: center;
              gap: 40px;
            }
            .signup-left {
              position: static; 
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
              gap: 15px; /* Stacks gracefully on mobile */
            }
            .signup-card {
              padding: 30px 20px;
            }
          }
        `}
      </style>

      <Link to="/">
        <img src={logo} alt="Stanton Academy" className="signup-logo" />
      </Link>

      <div className="signup-container">
        
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

        <div className="signup-right">
          <div className="signup-card">
            <h2>ENQUIRE NOW</h2>
            
            <form onSubmit={handleSubmit} className="signup-form">
              
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

              <div className="form-row">
                <div className="form-col">
                  <label className="form-label">Nationality<span>*</span></label>
                  <input 
                    type="text" 
                    placeholder="Please Select"
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
              
              {/* Phone and Email are now side-by-side to save height! */}
              <div className="form-row">
                <div className="form-col">
                  <label className="form-label">Phone number<span>*</span></label>
                  <div className="phone-group">
                    <select 
                      className="form-control" 
                      value={formData.countryCode} 
                      onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                      disabled={isSending}
                    >
                      {countryCodes.map((country, index) => (
                        <option key={index} value={country.code}>
                          {country.name} ({country.code})
                        </option>
                      ))}
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
              </div>
              
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
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Friends">Friends</option>
                  <option value="Family">Family</option>
                  <option value="Agent or Agency">Agent or Agency</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {formData.hearAbout === 'Other' && (
                <div className="form-col fade-in">
                  <label className="form-label">If you have selected Other, please specify here:<span>*</span></label>
                  <input 
                    type="text" 
                    required 
                    className="form-control"
                    value={formData.hearAboutOther}
                    onChange={(e) => setFormData({...formData, hearAboutOther: e.target.value})}
                    disabled={isSending}
                  />
                </div>
              )}

              <div className="form-col">
                <label className="form-label">Any questions or messages for us?</label>
                <textarea 
                  className="form-control"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  disabled={isSending}
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