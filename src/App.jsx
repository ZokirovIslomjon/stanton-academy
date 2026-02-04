import React, { useState } from 'react'; // Import useState
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Courses from './components/Courses'; 
import Location from './components/Location';
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal'; // Import Modal

import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  // 1. Create State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Function to open/close
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      
      {/* 3. Pass openModal to components that have buttons */}
      <Header onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />

      <div id="about">
        <WhyChooseUs />
      </div>
      
      <div id="courses">
        <Courses onOpenModal={openModal} />
      </div>

      <div id="location">
         <Location />
      </div>

      <div id="contact">
        <Footer />
      </div>

      {/* 4. Put the Modal here */}
      <RegisterModal isOpen={isModalOpen} onClose={closeModal} />

    </div>
  );
}

export default App;