import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Courses from './components/Courses'; 
// 1. Ensure this import is here
import Location from './components/Location';
import Footer from './components/Footer';

import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      
      <div id="about">
        <WhyChooseUs />
      </div>
      
      <div id="courses">
        <Courses />
      </div>

      {/* 2. ADD THIS SECTION BACK 👇 */}
      <div id="location">
         <Location />
      </div>

      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}

export default App;