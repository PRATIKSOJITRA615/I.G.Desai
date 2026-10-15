import React from 'react';

const CTABox = ({ title, description, buttonText, type }) => {
  return (
    <div className={`cta-box cta-${type}`}>
      <div className="cta-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="cta-action">
        <button className="btn-cta">{buttonText}</button>
      </div>
    </div>
  );
};

export default CTABox;
