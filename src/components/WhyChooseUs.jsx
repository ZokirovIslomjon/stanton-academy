import React from 'react';
import teacherIcon from '../assets/teacher.svg';
import eventsIcon from '../assets/events.svg';
import coworkingIcon from '../assets/coworking.svg';

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-50" id="about">
      <div className="container mx-auto px-4">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why are people <span className="text-green-600">choosing us?</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Stanton Academy has been teaching English to young people since 2014.
          </p>
        </div>

        {/* --- THE RESPONSIVE CONTAINER ---
            Mobile: Flex + Overflow (Swipe Left/Right)
            Desktop: Grid (3 Columns, Locked)
        */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 w-full no-scrollbar md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">
          
          {/* --- CARD 1 (Teacher) --- */}
          <div className="min-w-[85%] snap-center bg-white p-8 rounded-3xl shadow-lg border border-gray-100 md:min-w-0 md:w-auto hover:shadow-xl transition-shadow flex flex-col items-start text-left">
            {/* Orange Icon Background */}
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <img src={teacherIcon} alt="Teacher Icon" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Free second teacher</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              If you have not been able to understand the topic well, assistant teachers will always be by your side.
            </p>
          </div>

          {/* --- CARD 2 (Events) --- */}
          <div className="min-w-[85%] snap-center bg-white p-8 rounded-3xl shadow-lg border border-gray-100 md:min-w-0 md:w-auto hover:shadow-xl transition-shadow flex flex-col items-start text-left">
            {/* Red Icon Background */}
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <img src={eventsIcon} alt="Events Icon" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Free Events</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Tennis, golf, mafia, cinema, chat with celebrities and unforgettable trips.
            </p>
          </div>

          {/* --- CARD 3 (Co-working) --- */}
          <div className="min-w-[85%] snap-center bg-white p-8 rounded-3xl shadow-lg border border-gray-100 md:min-w-0 md:w-auto hover:shadow-xl transition-shadow flex flex-col items-start text-left">
            {/* Dark/Gray Icon Background */}
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <img src={coworkingIcon} alt="Co-working Icon" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Co-working zones</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              In each branch, there are special co-working zones for our students.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;