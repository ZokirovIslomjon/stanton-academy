import React from 'react';

const CourseCard = ({ image, tag, duration, rating, title, description, price }) => {
  return (
    <div className="course-card">
      <div className="course-img">
        <span className="course-tag">{tag}</span>
        <img src={image} alt={title} />
      </div>
      <div className="course-content">
        <div className="course-meta">
          <span><i className="far fa-clock"></i> {duration}</span>
          <span><i className="fas fa-star" style={{ color: '#FFC72C' }}></i> {rating}</span>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="course-footer">
          <span className="price">{price}</span>
          <button className="btn btn-secondary" style={{ padding: '8px 15px', fontSize: '0.8rem' }}>
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;