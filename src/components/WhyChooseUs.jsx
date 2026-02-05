import React from 'react';
import teacherIcon from '../assets/teacher.svg';
import eventsIcon from '../assets/events.svg';
import coworkingIcon from '../assets/coworking.svg';

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us" id="about">
      <div className="container">
        <div className="section-header">
          <h2>Why are people <span>choosing us?</span></h2>
          <p>Stanton Academy has been teaching English to young people since 2014.</p>
        </div>

        {/* Added wcu-grid for horizontal scroll */}
        <div className="wcu-grid">
          <div className="wcu-card">
            <div className="icon-wrapper icon-orange">
                <img src={teacherIcon} alt="Teacher Icon" width="60" height="60" />
            </div>
            <h3>Free second teacher</h3>
            <p>If you have not been able to understand the topic well, assistant teachers will always be by your side.</p>
          </div>

          <div className="wcu-card">
            <div className="icon-wrapper icon-red">
                <img src={eventsIcon} alt="Events Icon" width="60" height="60" />
            </div>
            <h3>Free Events</h3>
            <p>Tennis, golf, mafia, cinema, chat with celebrities and unforgettable trips.</p>
          </div>

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