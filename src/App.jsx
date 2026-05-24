import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Courses from './components/Courses';
import Location from './components/Location';
import Footer from './components/Footer';
import SignUpPage from './pages/SignUpPage';

import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  
  // Inject Google Ads Tag when the app mounts
  useEffect(() => {
    // 1. Create the external script tag
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16099290042';
    document.head.appendChild(script);

    // 2. Initialize the dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'AW-16099290042');

    // Cleanup function (optional, but good practice)
    return () => {
      document.head.removeChild(script);
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <BrowserRouter>
      <div className="App">
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;