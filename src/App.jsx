import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import FloatingSocials from './components/FloatingSocials'; 

import Home from './pages/Home';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LocationPage from './pages/LocationPage'; 
import HolidayCampPage from './pages/HolidayCamp';
import SignUpPage from './pages/SignUpPage'; // 👈 1. Import your new sign up page!

function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/location" element={<LocationPage />} /> 
        <Route path="/holiday-camp" element={<HolidayCampPage />} /> 
        
        {/* 👇 2. Add the route right here! 👇 */}
        <Route path="/signup" element={<SignUpPage />} /> 
      </Routes>

      <Footer />
      <ChatWidget />
      <FloatingSocials />
    </Router>
  );
}

export default App;