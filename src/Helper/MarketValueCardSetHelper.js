const getValueOrDefault = (value) =>
  value != null ? Number(value).toFixed(3) : ' - - ';

export const convertToUSMarketTime = (timestamp) => {
  if (!timestamp) return ' - - ';
  const date = new Date(timestamp * 1000);
  const options = {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return date.toLocaleString('en-US', options);
};
export const updateRealData = (
  values,
  currentIndex,
  setLatestData,
  setRandomizedData,
  setPrevCloseValue,
  setCurrentIndex
) => {
  if (!values || !values.timestamp?.[currentIndex]) return;   
  const realData = {
    time: convertToUSMarketTime(values.timestamp[currentIndex]),
    high: getValueOrDefault(values.high?.[currentIndex]),
    low: getValueOrDefault(values.low?.[currentIndex]),
    open: getValueOrDefault(values.open?.[currentIndex]),
    close: getValueOrDefault(values.close?.[currentIndex]),
  };

  setLatestData(realData);
  setRandomizedData(realData);

  if (realData.close !== ' - - ') {
    setPrevCloseValue(parseFloat(realData.close));
  }

  if (currentIndex < values.timestamp.length - 1) {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }
};

export const updateLastData = (values, setRandomizedData) => {
  if (
    values &&
    Array.isArray(values.timestamp) &&
    values.timestamp.length > 0 &&
    values.high &&
    values.low &&
    values.open &&
    values.close
  ) {
    const lastIndex = values.timestamp.length - 1;

    const realData = {
      time: convertToUSMarketTime(values.timestamp[lastIndex]),
      high: getValueOrDefault(values.high[lastIndex]),
      low: getValueOrDefault(values.low[lastIndex]),
      open: getValueOrDefault(values.open[lastIndex]),
      close: getValueOrDefault(values.close[lastIndex]),
    };
    setRandomizedData(realData);
  } else {
    console.warn('Invalid or empty data provided to updateLastData:', values);
    setRandomizedData({
      time: ' - - ',
      high: ' - - ',
      low: ' - - ',
      open: ' - - ',
      close: ' - - ',
    });
  }
};

export const applyRandomChanges = (
  setCloseColor,
  latestData,
  setRandomizedData,
  prevCloseValue,
  currentIndex
) => {
  if (!latestData) return;  

  if (currentIndex > 15) {
    setCloseColor('neutral');
    return;
  }

  function calculateParityValue(num) {
    const inValFilter = (num) =>
      Number(
        num
          ?.toString()
          .replace(/[^1-9]/g, '')
          .slice(-3)
          .slice(-1)
      ) || 0;  

    const inVal = inValFilter(num);
    const now = new Date();
    const seconds = now.getSeconds();

    return (
      (seconds % 2 === 0 ? inVal * 10 + seconds : 0 - (inVal * 10 + seconds)) *
      0.001
    );
  }

  const alteredData = {
    ...latestData,
    high: getValueOrDefault(
      parseFloat(latestData.high || 0) + calculateParityValue(latestData.high)
    ),
    low: getValueOrDefault(
      parseFloat(latestData.low || 0) + calculateParityValue(latestData.low)
    ),
    open: getValueOrDefault(
      parseFloat(latestData.open || 0) + calculateParityValue(latestData.open)
    ),
    close: getValueOrDefault(
      parseFloat(latestData.close || 0) + calculateParityValue(latestData.close)
    ),
  };
  setRandomizedData(alteredData);

  if (prevCloseValue !== null) {
    const alteredClose = parseFloat(alteredData.close);
    if (alteredClose > prevCloseValue) {
      setCloseColor('green');
    } else if (alteredClose < prevCloseValue) {
      setCloseColor('red');
    } else {
      setCloseColor('neutral');
    }
  }
};
