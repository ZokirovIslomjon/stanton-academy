import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 👈 Import routing
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Courses from './components/Courses';
import Location from './components/Location';
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal';
import SignUpPage from './pages/SignUpPage'; // 👈 Import the new page (adjust path if needed)

import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <BrowserRouter> {/* 👈 Wrap everything with BrowserRouter */}
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Header onOpenModal={openModal} />
              <Hero onOpenModal={openModal} />
              <div id="about"><WhyChooseUs /></div>
              <div id="courses"><Courses onOpenModal={openModal} /></div>
              <div id="location"><Location /></div>
              <div id="contact"><Footer /></div>
              <RegisterModal isOpen={isModalOpen} onClose={closeModal} />
            </>
          } />
          <Route path="/signup" element={<SignUpPage />} /> {/* 👈 Add the signup route */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;