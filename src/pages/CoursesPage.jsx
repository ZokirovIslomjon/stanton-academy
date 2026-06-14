import React, { useState } from 'react';
import Courses from '../components/Courses';

// Exact country codes from your SignUpPage
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

const CoursesPage = () => {
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Exact state from your SignUpPage
  const [formData, setFormData] = useState({
    fullName: '', nationality: '', age: '', countryCode: '+60', phone: '', email: '', course: '', hearAbout: '', hearAboutOther: '', message: ''
  });

  // Exact submit logic from your SignUpPage
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const finalHearAbout = formData.hearAbout === 'Other' ? `Other: ${formData.hearAboutOther}` : formData.hearAbout;

    const sheetData = {
      data: [{
        Name: formData.fullName,
        Nationality: formData.nationality,
        Age: formData.age,
        Phone: `(${formData.countryCode}) ${formData.phone}`,
        Email: formData.email,
        Course: formData.course,
        HearAbout: finalHearAbout,
        Message: formData.message || 'None',
        Date: new Date().toLocaleString()
      }]
    };

    try {
      const response = await fetch('https://sheetdb.io/api/v1/k5ohu0497ek0x', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetData)
      });

      if (response.ok) {
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'ads_conversion_Submit_lead_form_1', {
             'event_category': 'Lead Form',
             'event_label': formData.course 
          });
        }
        setIsSubmitted(true);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      alert('Failed to send application. Please try again or contact us directly on WhatsApp.');
    } finally {
      setIsSending(false);
    }
  };

  const handleResetForm = () => {
    setFormData({ fullName: '', nationality: '', age: '', countryCode: '+60', phone: '', email: '', course: '', hearAbout: '', hearAboutOther: '', message: '' });
    setIsSubmitted(false);
  };

  // Reusable styles to keep the JSX clean
  const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: '8px', border: '2px solid #e5e7eb', outline: 'none', fontSize: '0.95rem', backgroundColor: '#f9fafb', fontFamily: 'inherit', transition: 'all 0.2s ease' };
  const labelStyle = { display: 'block', marginBottom: '6px', fontWeight: '600', color: '#374151', fontSize: '0.85rem' };
  const requiredMark = <span style={{ color: '#ef4444' }}>*</span>;

  return (
    <main className="page-wrapper" style={{ paddingTop: '100px', paddingBottom: '80px', backgroundColor: '#f9fafb', minHeight: '80vh' }}>
      
      {/* Top Section: The Course Grid */}
      <Courses />

      {/* Bottom Section: The Custom Registration Form */}
      <section style={{ maxWidth: '900px', margin: '60px auto 0', padding: '0 20px' }} id="register-form">
        <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '50px 40px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6' }}>
          
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0', animation: 'fadeIn 0.4s ease-in-out' }}>
              <div style={{ width: '80px', height: '80px', backgroundColor: '#e6f4ea', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px', boxShadow: '0 0 0 10px rgba(0, 107, 63, 0.05)' }}>
                <svg fill="none" viewBox="0 0 24 24" stroke="#006B3F" strokeWidth={3} style={{ width: '40px', height: '40px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 style={{ color: '#1a1a1a', fontSize: '1.8rem', fontWeight: '800', marginBottom: '15px' }}>Application Received!</h2>
              <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 30px' }}>
                Thank you, <strong>{formData.fullName}</strong>. Your enquiry has been successfully submitted. <br/><br/>
                Our admissions team at Stanton Academy will review your details and contact you shortly.
              </p>
              <button 
                onClick={handleResetForm}
                style={{ backgroundColor: '#006B3F', color: '#ffffff', padding: '14px 40px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '1.05rem', transition: 'transform 0.2s', boxShadow: '0 10px 20px rgba(0, 107, 63, 0.2)' }}
              >
                Done
              </button>
            </div>
          ) : (
            <div style={{ animation: 'fadeIn 0.4s ease-in-out' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#1f2937', marginBottom: '10px', textTransform: 'uppercase' }}>
                  Enquire <span style={{ color: '#006B3F' }}>Now</span>
                </h2>
                <p style={{ color: '#6b7280', fontSize: '1.05rem' }}>Fill out the form below to secure your spot in our upcoming classes.</p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                
                {/* Custom internal CSS for focus states since inline styles can't handle pseudoclasses */}
                <style>{`
                  .course-custom-input:focus { border-color: #006B3F !important; background-color: #ffffff !important; box-shadow: 0 0 0 2px rgba(0, 107, 63, 0.1); }
                  @media (max-width: 600px) { .course-form-grid { grid-template-columns: 1fr !important; } }
                `}</style>

                {/* Full Name */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Full Name (As in IC/ Passport){requiredMark}</label>
                  <input type="text" required className="course-custom-input" style={inputStyle}
                         value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} disabled={isSending} />
                </div>

                {/* Nationality & Age */}
                <div className="course-form-grid" style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={labelStyle}>Nationality{requiredMark}</label>
                    <input type="text" placeholder="Please Select" required className="course-custom-input" style={inputStyle}
                           value={formData.nationality} onChange={(e) => setFormData({...formData, nationality: e.target.value})} disabled={isSending} />
                  </div>
                  <div>
                    <label style={labelStyle}>Age{requiredMark}</label>
                    <input type="number" min="1" max="100" required className="course-custom-input" style={inputStyle}
                           value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} disabled={isSending} />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="course-form-grid" style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={labelStyle}>Phone number{requiredMark}</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <select className="course-custom-input" style={{ ...inputStyle, width: '40%', cursor: 'pointer' }}
                              value={formData.countryCode} onChange={(e) => setFormData({...formData, countryCode: e.target.value})} disabled={isSending}>
                        {countryCodes.map((country, idx) => (
                          <option key={idx} value={country.code}>{country.code}</option>
                        ))}
                      </select>
                      <input type="tel" required className="course-custom-input" style={{ ...inputStyle, width: '60%' }}
                             value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} disabled={isSending} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Email{requiredMark}</label>
                    <input type="email" required className="course-custom-input" style={inputStyle}
                           value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} disabled={isSending} />
                  </div>
                </div>

                {/* Courses Dropdown */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Courses{requiredMark}</label>
                  <select required className="course-custom-input" style={{ ...inputStyle, cursor: 'pointer', color: formData.course ? '#1a1a1a' : '#9ca3af' }}
                          value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} disabled={isSending}>
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

                {/* Hear About Dropdown */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>How did you hear about us?{requiredMark}</label>
                  <select required className="course-custom-input" style={{ ...inputStyle, cursor: 'pointer', color: formData.hearAbout ? '#1a1a1a' : '#9ca3af' }}
                          value={formData.hearAbout} onChange={(e) => setFormData({...formData, hearAbout: e.target.value})} disabled={isSending}>
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

                {/* Hear About Other (Conditional) */}
                {formData.hearAbout === 'Other' && (
                  <div style={{ gridColumn: '1 / -1', animation: 'fadeIn 0.3s' }}>
                    <label style={labelStyle}>If you have selected Other, please specify here:{requiredMark}</label>
                    <input type="text" required className="course-custom-input" style={inputStyle}
                           value={formData.hearAboutOther} onChange={(e) => setFormData({...formData, hearAboutOther: e.target.value})} disabled={isSending} />
                  </div>
                )}

                {/* Message Box */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Any questions or messages for us?</label>
                  <textarea className="course-custom-input" style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                            value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} disabled={isSending}></textarea>
                </div>

                {/* Submit Button */}
                <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                  <button type="submit" disabled={isSending}
                          style={{ width: '100%', backgroundColor: '#006B3F', color: '#ffffff', padding: '16px', borderRadius: '10px', border: 'none', fontSize: '1.05rem', textTransform: 'uppercase', fontWeight: '800', cursor: isSending ? 'not-allowed' : 'pointer', opacity: isSending ? 0.7 : 1, transition: 'all 0.3s ease' }}
                          onMouseOver={e => !isSending && (e.currentTarget.style.backgroundColor = '#00502f', e.currentTarget.style.transform = 'translateY(-2px)', e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 107, 63, 0.2)')} 
                          onMouseOut={e => !isSending && (e.currentTarget.style.backgroundColor = '#006B3F', e.currentTarget.style.transform = 'translateY(0)', e.currentTarget.style.boxShadow = 'none')}>
                    {isSending ? 'SENDING...' : 'SUBMIT ENQUIRY'}
                  </button>
                </div>

              </form>
            </div>
          )}

        </div>
      </section>

    </main>
  );
};

export default CoursesPage;