import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import FloatingSocials from './components/FloatingSocials';
import ScrollToTop from './components/ScrollToTop'; // 👈 1. Import it here

import Home from './pages/Home';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LocationPage from './pages/LocationPage';
import HolidayCampPage from './pages/HolidayCamp';
import SignUpPage from './pages/SignUpPage';
import PublicPage from './pages/PublicPage';

import GeneralEnglishPage from './pages/GeneralEnglishPage';
import IELTSPreparationPage from './pages/IELTSPreparationPage';
import LanguagePage from './pages/LanguagePage';

import AdminApp from './admin/AdminApp';
import { SiteImagesProvider } from './lib/SiteImagesContext';

function PublicSite() {
  return (
    <SiteImagesProvider>
      {/* 👇 2. Add it right here! Now it watches every route change */}
      <ScrollToTop />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/holiday-camp" element={<HolidayCampPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/general-english" element={<GeneralEnglishPage />} />
        <Route path="/ielts-preparation" element={<IELTSPreparationPage />} />
        <Route path="/language/:langId" element={<LanguagePage />} />
        <Route path="/p/:slug" element={<PublicPage />} />
      </Routes>

      <Footer />
      <ChatWidget />
      <FloatingSocials />
    </SiteImagesProvider>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin panel renders its own layout — no public Header/Footer/ChatWidget */}
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </Router>
  );
}

export default App;