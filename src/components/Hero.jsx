import React from 'react';
import bookIcon from '../assets/book.png';
import notebookIcon from '../assets/notebook.png';
import penIcon from '../assets/pen.png';

const Hero = ({ onOpenModal }) => {
  return (
    <section className="relative bg-white pt-20 pb-16 overflow-hidden">
      
      {/* --- BACKGROUND ICONS (Fixed for Mobile & Desktop) --- */}
      
      {/* Book Icon - Left Side */}
      <img 
        src={bookIcon} 
        alt="Book" 
        className="absolute top-20 -left-4 w-16 opacity-60 md:left-10 md:w-28 md:opacity-100 animate-bounce-slow" 
      />

      {/* Notebook Icon - Right Side */}
      <img 
        src={notebookIcon} 
        alt="Notebook" 
        className="absolute top-40 -right-4 w-20 opacity-60 md:right-20 md:w-32 md:opacity-100 animate-pulse-slow" 
      />

      {/* Pen Icon - Bottom Left (Optional third icon) */}
      <img 
        src={penIcon} 
        alt="Pen" 
        className="absolute bottom-10 left-0 w-12 opacity-50 md:bottom-20 md:left-32 md:w-24 md:opacity-100" 
      />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* --- HERO TEXT --- */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            We don't just teach English, <span className="text-orange-500">we change people's lives!</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-8">
            Master the English language with Stanton Academy's world-class curriculum.
          </p>

          <div className="flex justify-center">
             <button 
                className="bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105" 
                onClick={onOpenModal}
             >
                Sign up for the first lesson ✨
             </button>
          </div>
        </div>

        {/* --- STATS CONTAINER (The Mobile Fix) --- */}
        {/* Mobile: Grid (2 cols). Desktop: Flex (Row) */}
        <div className="grid grid-cols-2 gap-4 w-full md:flex md:flex-row md:justify-center md:gap-8">
            
            {/* Card 1: Experience */}
            <div className="bg-yellow-50 p-6 rounded-2xl shadow-sm border border-yellow-100 flex flex-col items-center justify-center text-center w-full">
                <div className="w-3 h-3 bg-blue-500 rounded-full mb-2"></div>
                <h2 className="text-3xl font-bold text-gray-900">10+</h2>
                <p className="text-gray-600 text-sm">Years of experience</p>
            </div>

            {/* Card 2: Students */}
            <div className="bg-red-50 p-6 rounded-2xl shadow-sm border border-red-100 flex flex-col items-center justify-center text-center w-full">
                <div className="w-3 h-3 bg-red-500 rounded-full mb-2"></div>
                <h2 className="text-3xl font-bold text-gray-900">1,000+</h2>
                <p className="text-gray-600 text-sm">Students trained</p>
            </div>

            {/* Card 3: Teachers */}
            {/* 'col-span-2' makes this card take full width on mobile so it doesn't look lonely */}
            <div className="col-span-2 md:col-span-1 bg-green-50 p-6 rounded-2xl shadow-sm border border-green-100 flex flex-col items-center justify-center text-center w-full md:w-auto md:min-w-[200px]">
                <div className="w-3 h-3 bg-green-500 rounded-full mb-2"></div>
                <h2 className="text-3xl font-bold text-gray-900">50+</h2>
                <p className="text-gray-600 text-sm">Experienced Teachers</p>
            </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;