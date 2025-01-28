import React, { useEffect, useState } from 'react';
import './styles.css';
import MARKET from '../../assets/MARKET.png';
import ONLINE from '../../assets/ONLINE.png';
import NEWS from '../../assets/NEWS.png';
import CALCULATOR from '../../assets/CALCULATOR.png';

const ServiceCard = ({ data, onClick }) => {
  const { prompt } = data;
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setGlow(true), data.delay);
    const removeGlow = setTimeout(() => setGlow(false), data.delay + 800);
    return () => {
      clearTimeout(timeout);
      clearTimeout(removeGlow);
    };
  }, [data.delay]);

  return (
    <div
      className={`container noselect ${glow ? 'glow' : ''}`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="canvas">
        {Array.from({ length: 25 }, (_, i) => (
          <div key={i} className={`tracker tr-${i + 1}`}></div>
        ))}
        <div
          id="card"
          style={{
            backgroundImage: `url(${
              prompt === 'Today News'
                ? NEWS
                : prompt === 'Live Market Values'
                ? MARKET
                : prompt === 'Calculators'
                ? CALCULATOR
                : ONLINE
            })`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ServiceCard;
