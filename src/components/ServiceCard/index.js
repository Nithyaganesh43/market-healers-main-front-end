import React from 'react';
import './styles.css';

const ServiceCard = ({ data, onClick }) => {
  const { prompt, text } = data;

  return (
    <div
      className="container noselect"
      onClick={onClick}
      style={{ cursor: 'pointer' }}>
      <div className="canvas">
        {Array.from({ length: 25 }, (_, i) => (
          <div key={i} className={`tracker tr-${i + 1}`}></div>
        ))}

        <div id="card">
          <p id="prompt">{prompt}</p>
          <div className="title">{text}</div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
