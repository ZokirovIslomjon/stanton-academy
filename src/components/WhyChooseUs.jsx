import React from 'react';
import teacherIcon from '../assets/teacher.svg';
import eventsIcon from '../assets/events.svg';
import coworkingIcon from '../assets/coworking.svg';
import { useLanguage } from '../lib/LanguageContext';

const WhyChooseUs = () => {
  const { t } = useLanguage();

  return (
    <section className="why-choose-us" id="about">
      <div className="container">
        <div className="section-header">
          <h2>{t('whyChooseUs.heading')}<span>{t('whyChooseUs.headingHighlight')}</span></h2>
        </div>

        {/* Added wcu-grid for horizontal scroll */}
        <div className="wcu-grid">
          <div className="wcu-card">
            <div className="icon-wrapper icon-orange">
                <img src={teacherIcon} alt="Teacher Icon" width="60" height="60" />
            </div>
            <h3>{t('whyChooseUs.card1Title')}</h3>
            <p>{t('whyChooseUs.card1Desc')}</p>
          </div>

          <div className="wcu-card">
            <div className="icon-wrapper icon-red">
                <img src={eventsIcon} alt="Events Icon" width="60" height="60" />
            </div>
            <h3>{t('whyChooseUs.card2Title')}</h3>
            <p>{t('whyChooseUs.card2Desc')}</p>
          </div>

          <div className="wcu-card">
            <div className="icon-wrapper icon-dark">
                <img src={coworkingIcon} alt="Co-working Icon" width="60" height="60" />
            </div>
            <h3>{t('whyChooseUs.card3Title')}</h3>
            <p>{t('whyChooseUs.card3Desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;