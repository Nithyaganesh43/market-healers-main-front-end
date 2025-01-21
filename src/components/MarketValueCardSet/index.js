import React, { useEffect, useState } from 'react';
import './styles.css';
import {updateRealData,updateLastData,applyRandomChanges} from '../../Helper/MarketValueCardSetHelper'


const MarketValueCardSet = ({ value }) => {
  const { meta, values } = value.value;
  
  const [currentIndex, setCurrentIndex] = useState(
    Number(localStorage.getItem('index'))
  );
  const [latestData, setLatestData] = useState({});
  const [randomizedData, setRandomizedData] = useState({});
  const [prevCloseValue, setPrevCloseValue] = useState(0);
  const [closeColor, setCloseColor] = useState('neutral');
  

  useEffect(() => {
    if (value.Market) {
      updateRealData(values,currentIndex,setLatestData,setRandomizedData,setPrevCloseValue,setCurrentIndex);
    } else {
      updateLastData(values, setRandomizedData, currentIndex);
    }
  }, []);

  useEffect(() => {
    if (value.Market) {
      const minuteInterval = setInterval(()=>{
         updateRealData(
           values,
           currentIndex,
           setLatestData,
           setRandomizedData,
           setPrevCloseValue,
           setCurrentIndex
         );
      }, 60000);
      return () => clearInterval(minuteInterval);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (value.Market) {
      const secondInterval = setInterval(()=>{
        applyRandomChanges(
          setCloseColor,
          latestData,
          setRandomizedData,
          prevCloseValue,
          currentIndex
        );
      }, 1000);
      return () => clearInterval(secondInterval);
    }
  }, [latestData]);

  return (
    <div id="MarketValueCard">
      <h3 className="company-name">{meta.longName}</h3>
      <span className={`close-value ${closeColor}`}>
        {randomizedData.close}
      </span>
      <span className="time">{randomizedData.time}</span>
      <div className="dynamic-data">
        <div className="data-item">
          <span className="label">High</span>
          <span>{randomizedData.high}</span>
        </div>
        <div className="data-item">
          <span className="label">Low</span>
          <span>{randomizedData.low}</span>
        </div>
        <div className="data-item">
          <span className="label">Open</span>
          <span>{randomizedData.open}</span>
        </div>
        <div className="data-item">
          <span className="label">Close</span>
          <span>{randomizedData.close}</span>
        </div>
      </div>
      <p>
        <span className="label">Exchange:</span> {meta.fullExchangeName}
      </p>
      <p>
        <span className="label">Price:</span> {meta.regularMarketPrice}
      </p>
      <p>
        <span className="label">Day High:</span> {meta.regularMarketDayHigh}
      </p>
      <p>
        <span className="label">Day Low:</span> {meta.regularMarketDayLow}
      </p>
      <p>
        <span className="label">52-Week High:</span> {meta.fiftyTwoWeekHigh}
      </p>
      <p>
        <span className="label">52-Week Low:</span> {meta.fiftyTwoWeekLow}
      </p>
    </div>
  );
};

export default MarketValueCardSet;
