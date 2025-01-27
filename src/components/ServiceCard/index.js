import React from 'react';
import './styles.css';
import MARKET from '../../assets/MARKET.png'
import ONLINE from '../../assets/ONLINE.png';
import NEWS from '../../assets/NEWS.png'
import CALCULATOR from '../../assets/CALCULATOR.png';
const ServiceCard = ({ data, onClick }) => {
  const { prompt, text  } = data;

  return (
    <div
      className="container noselect"
      onClick={onClick}
      style={{ cursor: 'pointer' }}>
      <div className="canvas">
        {Array.from({ length: 25 }, (_, i) => (
          <div key={i} className={`tracker tr-${i + 1}`}></div>
        ))}
        <div
          id="card"
          style={{
            backgroundImage: `url(${
              prompt == 'Today News'
                ? NEWS
                : prompt == 'Live Market Values'
                ? MARKET
                : prompt == 'Calculators'?CALCULATOR:ONLINE
            })`,
          }}> 
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
