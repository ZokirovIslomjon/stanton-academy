import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Courses from './components/Courses';
import Location from './components/Location';
import Footer from './components/Footer';
import SignUpPage from './pages/SignUpPage';
import ChatWidget from './components/ChatWidget';
import HolidayCamp from './pages/HolidayCamp'; // ← NEW

import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <style>{`
          .floating-social-container {
            position: fixed; left: 20px; bottom: 40px;
            display: flex; flex-direction: column; gap: 15px; z-index: 9999;
          }
          .float-icon {
            width: 55px; height: 55px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            color: white !important; font-size: 30px; text-decoration: none;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .float-icon:hover { transform: scale(1.1); box-shadow: 0 6px 20px rgba(0,0,0,0.3); }
          .float-whatsapp { background-color: #25D366; }
          .float-telegram  { background-color: #0088cc; }
          @media (max-width: 768px) {
            .floating-social-container { left: 15px; bottom: 25px; gap: 10px; }
            .float-icon { width: 45px; height: 45px; font-size: 24px; }
          }
        `}</style>

        <div className="floating-social-container">
          <a href="https://wa.me/601118648860" target="_blank" rel="noopener noreferrer" className="float-icon float-whatsapp" aria-label="WhatsApp">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="https://t.me/stantonacademykl" target="_blank" rel="noopener noreferrer" className="float-icon float-telegram" aria-label="Telegram">
            <i className="fab fa-telegram-plane"></i>
          </a>
        </div>

        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Hero />
              <div id="about"><WhyChooseUs /></div>
              <div id="courses"><Courses /></div>
              <div id="location"><Location /></div>
              <div id="contact"><Footer /></div>
            </>
          } />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/holiday-camp" element={<HolidayCamp />} /> {/* ← NEW */}
        </Routes>

        <ChatWidget />
      </div>
    </BrowserRouter>
  );
}

export default App;