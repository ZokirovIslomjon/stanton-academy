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

        .content-section { padding: 40px 20px 100px; background-color: #ffffff; position: relative; z-index: 2; }
        .content-container { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px; }
        .content-block { background: #f9fafb; padding: 50px 40px; border-radius: 24px; border: 1px solid #f3f4f6; box-shadow: 0 10px 30px rgba(0,0,0,0.03); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .content-block:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
        .content-block h2 { font-size: 2rem; color: #FFC72C; font-weight: 800; margin-bottom: 20px; position: relative; display: inline-block; }
        .content-block h2::after { content: ''; position: absolute; bottom: -8px; left: 0; width: 40px; height: 4px; background-color: #006B3F; border-radius: 2px; }
        .content-block p { color: #4b5563; font-size: 1.05rem; line-height: 1.8; margin-bottom: 15px; }
        
        .content-list { list-style: none; padding: 0; margin: 0; }
        .content-list li { color: #4b5563; font-size: 1.05rem; line-height: 1.8; margin-bottom: 15px; padding-left: 24px; position: relative; }
        .content-list li::before { content: '•'; color: #006B3F; font-size: 1.5rem; position: absolute; left: 0; top: -4px; }
        .content-list strong { color: #1f2937; font-weight: 600; }

        @media (max-width: 900px) { 
          .about-hero { padding: 140px 20px 60px; } 
          .content-block { padding: 30px 20px; } 
        }
      `}</style>

      <section className="about-hero">
        <h1><span style={{ color: '#006B3F' }}>About</span> <span style={{ color: '#FFC72C' }}>Us</span></h1>
      </section>

      <section className="content-section">
        <div className="content-container">
          <div className="content-block">
            <h2>About Stanton Academy</h2>
            <p>Welcome to Kuala Lumpur's premier boutique language center. Located in the vibrant heart of Bukit Bintang inside the historic Wisma Hainan, we trade crowded classrooms for a premium learning experience. Unlike other centers, our boutique setup allows us to focus entirely on your individual progress, helping international students, professionals, and holidaymakers achieve fluency right from the center of Malaysia's capital.</p>
          </div>

          <div className="content-block">
            <h2>The Boutique Advantage</h2>
            <ul className="content-list">
              <li><strong>Intimate Class Sizes:</strong> Smaller groups mean more speaking time and direct attention from your teacher.</li>
              <li><strong>Personalized Feedback:</strong> Customized learning plans tailored to your specific speed, goals, and weaknesses.</li>
              <li><strong>Premium Community:</strong> A close-knit, supportive environment where you are a name, never a number.</li>
              <li><strong>Bukit Bintang Hub:</strong> Located in Wisma Hainan, steps away from major transit, shopping, and landmarks.</li>
            </ul>
          </div>

          <div className="content-block">
            <h2>Our Programs</h2>
            <ul className="content-list">
              <li><strong>Holiday English:</strong> Fun, immersive seasonal programs combining language learning with Kuala Lumpur exploration.</li>
              <li><strong>Intensive English:</strong> Accelerated daytime tracks built for rapid, immersive fluency.</li>
              <li><strong>IELTS Preparation:</strong> Targeted strategies and mock exams to secure your target band score.</li>
              <li><strong>Malay Language:</strong> Practical conversational courses for navigating daily life in Malaysia.</li>
              <li><strong>Focus on Speaking:</strong> Dedicated workshops built exclusively to eliminate fear and build real-world confidence.</li>
              <li><strong>Business English:</strong> Professional vocabulary, presentation skills, and corporate writing for career growth.</li>
            </ul>
          </div>
        </div>
      </section>

      <WhyChooseUs />
    </main>
  );
};

export default AboutPage;