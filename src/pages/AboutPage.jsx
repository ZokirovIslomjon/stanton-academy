import React, { useEffect, useState } from 'react';
import WhyChooseUs from '../components/WhyChooseUs';
import { supabase } from '../lib/supabaseClient';
import { renderListItems } from '../lib/contentHelpers';

const DEFAULT_CONTENT = {
  about_intro: "Welcome to Kuala Lumpur's premier boutique language center. Located in the vibrant heart of Bukit Bintang inside the historic Wisma Hainan, we trade crowded classrooms for a premium learning experience. Unlike other centers, our boutique setup allows us to focus entirely on your individual progress, helping international students, professionals, and holidaymakers achieve fluency right from the center of Malaysia's capital.",
  about_advantage_items: [
    'Intimate Class Sizes: Smaller groups mean more speaking time and direct attention from your teacher.',
    'Personalized Feedback: Customized learning plans tailored to your specific speed, goals, and weaknesses.',
    'Premium Community: A close-knit, supportive environment where you are a name, never a number.',
    'Bukit Bintang Hub: Located in Wisma Hainan, steps away from major transit, shopping, and landmarks.',
  ].join('\n'),
  about_programs_items: [
    'Holiday English: Fun, immersive seasonal programs combining language learning with Kuala Lumpur exploration.',
    'Intensive English: Accelerated daytime tracks built for rapid, immersive fluency.',
    'IELTS Preparation: Targeted strategies and mock exams to secure your target band score.',
    'Malay Language: Practical conversational courses for navigating daily life in Malaysia.',
    'Focus on Speaking: Dedicated workshops built exclusively to eliminate fear and build real-world confidence.',
    'Business English: Professional vocabulary, presentation skills, and corporate writing for career growth.',
  ].join('\n'),
};

const AboutPage = () => {
  const [content, setContent] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    let cancelled = false;

    async function loadContent() {
      const { data, error } = await supabase.from('page_content').select('key, value').eq('page', 'about');
      if (cancelled) return;
      if (error) {
        console.error('Failed to load page content:', error.message);
        return;
      }
      const map = {};
      (data || []).forEach((row) => { map[row.key] = row.value; });
      setContent((prev) => ({ ...prev, ...map }));
    }

    loadContent();
    return () => {
      cancelled = true;
    };
  }, []);

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
            <p>{content.about_intro}</p>
          </div>

          <div className="content-block">
            <h2>The Boutique Advantage</h2>
            <ul className="content-list">
              {renderListItems(content.about_advantage_items)}
            </ul>
          </div>

          <div className="content-block">
            <h2>Our Programs</h2>
            <ul className="content-list">
              {renderListItems(content.about_programs_items)}
            </ul>
          </div>
        </div>
      </section>

      <WhyChooseUs />
    </main>
  );
};

export default AboutPage;