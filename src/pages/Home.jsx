import React from 'react';

// Import all your section components
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import Courses from '../components/Courses';
import FAQ from '../components/FAQ';
import Location from '../components/Location';

const Home = () => {
  return (
    <main>
      {/* This stacks everything vertically for your main landing page */}
      <Hero />
      <WhyChooseUs />
      <Courses />
      <FAQ />
      <Location />
    </main>
  );
};

export default Home;