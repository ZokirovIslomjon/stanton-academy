import React from 'react';

// 1. IMPORT YOUR ICONS HERE
// (Make sure the names match exactly what you dragged into the folder!)
import teacherIcon from '../assets/teacher.svg';
import eventsIcon from '../assets/events.svg';
import coworkingIcon from '../assets/coworking.svg';

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <div className="container">
        <div className="section-header">
          <h2>Why are people <span>choosing us?</span></h2>
          <p>Stanton Academy has been teaching English to young people since 2014.</p>
        </div>

        <div className="wcu-grid">
          
          {/* Card 1 */}
          <div className="wcu-card">
            <div className="icon-wrapper icon-orange">
                {/* 2. USE THE IMPORTED ICON */}
                <img src={teacherIcon} alt="Teacher Icon" width="60" height="60" />
            </div>
            <h3>Free second teacher</h3>
            <p>If you have not been able to understand the topic well, assistant teachers will always be by your side.</p>
          </div>

          {/* Card 2 */}
          <div className="wcu-card">
            <div className="icon-wrapper icon-red">
                <img src={eventsIcon} alt="Events Icon" width="60" height="60" />
            </div>
            <h3>Free Events</h3>
            <p>Tennis, golf, mafia, cinema, chat with celebrities and unforgettable trips.</p>
          </div>

          {/* Card 3 */}
          <div className="wcu-card">
            <div className="icon-wrapper icon-dark">
                <img src={coworkingIcon} alt="Co-working Icon" width="60" height="60" />
            </div>
            <h3>Co-working zones</h3>
            <p>In each branch, there are special co-working zones for our students.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;