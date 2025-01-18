import React, { useEffect, useState } from 'react';
import './styles.css';

const convertToIST = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const options = {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return date.toLocaleTimeString('en-IN', options);
};

const MarketValueCardSet = ({ value }) => {
  const { meta, values } = value.value;
  value.Market = true;
  const [currentIndex, setCurrentIndex] = useState(
    Number(localStorage.getItem('index'))
  );
  const [latestData, setLatestData] = useState({});
  const [randomizedData, setRandomizedData] = useState({});
  const [prevCloseValue, setPrevCloseValue] = useState(0);
  const [closeColor, setCloseColor] = useState('neutral');

  const getValueOrDefault = (value) =>
    value != null ? Number(value).toFixed(3) : ' - - ';

  const updateRealData = () => {
    const realData = {
      time: convertToIST(values.timestamp[currentIndex]),
      high: getValueOrDefault(values.high[currentIndex]),
      low: getValueOrDefault(values.low[currentIndex]),
      open: getValueOrDefault(values.open[currentIndex]),
      close: getValueOrDefault(values.close[currentIndex]),
    };
    setLatestData(realData);
    setRandomizedData(realData);
    if (currentIndex < values.timestamp.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const updateLastData = () => {
    const realData = {
      time: convertToIST(values.timestamp[values.timestamp.length - 1]),
      high: getValueOrDefault(values.high[values.timestamp.length - 1]),
      low: getValueOrDefault(values.low[values.timestamp.length - 1]),
      open: getValueOrDefault(values.open[values.timestamp.length - 1]),
      close: getValueOrDefault(values.close[values.timestamp.length - 1]),
    };
    setRandomizedData(realData);
  };

  const applyRandomChanges = () => {
    if (currentIndex > 13) {
      setCloseColor('neutral');
      return;
    }

    const getRandomChange = () => (Math.random() * 2 - 1) * 0.2;
    const alteredData = {
      ...latestData,
      high: getValueOrDefault(parseFloat(latestData.high) + getRandomChange()),
      low: getValueOrDefault(parseFloat(latestData.low) + getRandomChange()),
      open: getValueOrDefault(parseFloat(latestData.open) + getRandomChange()),
      close: getValueOrDefault(
        parseFloat(latestData.close) + getRandomChange()
      ),
    };
    setRandomizedData(alteredData);

    if (prevCloseValue !== null) {
      if (parseFloat(alteredData.close) > prevCloseValue) {
        setCloseColor('green');
      } else if (parseFloat(alteredData.close) < prevCloseValue) {
        setCloseColor('red');
      } else {
        setCloseColor('neutral');
      }
    }
    setPrevCloseValue(parseFloat(alteredData.close));
  };

  useEffect(() => {
    if (value.Market) {
      updateRealData();
    } else {
      updateLastData();
    }
  }, []);

  useEffect(() => {
    if (value.Market) {
      const minuteInterval = setInterval(updateRealData, 60000);
      return () => clearInterval(minuteInterval);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (value.Market) {
      const secondInterval = setInterval(applyRandomChanges, 1000);
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
