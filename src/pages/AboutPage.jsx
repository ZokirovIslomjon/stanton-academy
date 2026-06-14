import React from 'react';
import WhyChooseUs from '../components/WhyChooseUs'; 

const AboutPage = () => {
  return (
    <main className="about-page-wrapper">
      <style>{`
        .about-page-wrapper { overflow-x: hidden; }

        .about-hero {
          position: relative;
          padding: 160px 20px 80px;
          text-align: center;
          background-color: #ffffff; 
          overflow: hidden;
          z-index: 1;
        }

        /* MASSIVE GREEN BLOB ON TOP LEFT */
        .about-hero::before {
          content: '';
          position: absolute;
          top: -20vw;
          left: -20vw;
          width: 80vw;
          height: 80vw;
          background: radial-gradient(circle, rgba(0, 107, 63, 0.12) 0%, transparent 65%);
          z-index: -1;
          pointer-events: none;
        }

        /* MASSIVE YELLOW BLOB ON RIGHT */
        .about-hero::after {
          content: '';
          position: absolute;
          top: -10vw;
          right: -20vw;
          width: 80vw;
          height: 80vw;
          background: radial-gradient(circle, rgba(255, 199, 44, 0.12) 0%, transparent 65%);
          z-index: -1;
          pointer-events: none;
        }

        .about-hero h1 { font-size: clamp(3rem, 6vw, 4.5rem); font-weight: 800; line-height: 1.1; margin-bottom: 20px; }

        .mv-section { padding: 40px 20px 100px; background-color: #ffffff; position: relative; z-index: 2; }
        .mv-container { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
        .mv-block { background: #f9fafb; padding: 50px 40px; border-radius: 24px; border: 1px solid #f3f4f6; box-shadow: 0 10px 30px rgba(0,0,0,0.03); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .mv-block:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
        .mv-block h2 { font-size: 2.2rem; color: #FFC72C; font-weight: 800; margin-bottom: 20px; position: relative; display: inline-block; }
        .mv-block h2::after { content: ''; position: absolute; bottom: -8px; left: 0; width: 40px; height: 4px; background-color: #006B3F; border-radius: 2px; }
        .mv-block p { color: #4b5563; font-size: 1.05rem; line-height: 1.8; margin-bottom: 0; }

        @media (max-width: 900px) { .mv-container { grid-template-columns: 1fr; gap: 30px; } .about-hero { padding: 140px 20px 60px; } }
      `}</style>

      <section className="about-hero">
        <h1><span style={{ color: '#006B3F' }}>About</span> <span style={{ color: '#FFC72C' }}>Us</span></h1>
      </section>

      <section className="mv-section">
        <div className="mv-container">
          <div className="mv-block">
            <h2>Mission</h2>
            <p>Our mission is to empower individuals with the linguistic skills and cultural intelligence needed to connect, communicate, and thrive in a globalized world.</p>
          </div>
          <div className="mv-block">
            <h2>Vision</h2>
            <p>In today’s interconnected world, speaking a single language is no longer enough. Whether your goal is to advance your career, prepare for international studies, travel with confidence, or simply connect with people from different walks of life, our mission is to empower you with the communication skills you need to thrive. We are dedicated to transforming the way our students experience language, shifting the focus from rigid textbook memorization to fluent, real-world application.</p>
          </div>
        </div>
      </section>

      <WhyChooseUs />
    </main>
  );
};

export default AboutPage;