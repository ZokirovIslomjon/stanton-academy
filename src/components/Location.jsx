import React from 'react';

const Location = () => {
  return (
    <section className="location-section">
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#006B3F', fontWeight: '700' }}>Visit our <span>Campus</span> </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>We are waiting for you!</p>
        </div>

        <div className="location-grid">
          
          <div className="location-info">
            <div className="info-item">
                <div className="icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                    <h3>Our Office</h3>
                    <p>No 112 & 114, 5th Floor, Wisma Hainan, Jalan Pudu 55100, Kuala Lumpur</p>
                </div>
            </div>

            <div className="info-item">
                <div className="icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                    <h3>Phone</h3>
                    <p>+60 1118648860</p>
                </div>
            </div>

            <div className="info-item">
                <div className="icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                    <h3>Email</h3>
                    <p>info@stanton-academy.com</p>
                </div>
            </div>
          </div>

          <div className="map-container">
             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.81043071722!2d101.70306767586877!3d3.1446806968307426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49d6399439ad%3A0x25c4210ca0a69381!2sThe%20Federation%20Of%20Hainan%20Association%20Malaysia!5e0!3m2!1sen!2smy!4v1769869773255!5m2!1sen!2smy" width="100%" height="450" style={{ border: 0, display: 'block' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Location;