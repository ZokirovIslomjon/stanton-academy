import React from 'react';
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
